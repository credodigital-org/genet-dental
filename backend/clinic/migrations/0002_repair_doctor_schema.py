from django.db import migrations


def repair_doctor_columns(apps, schema_editor):
    """Repair older databases where 0001 was recorded as applied before
    the Doctor metadata columns existed.

    This migration changes only missing physical columns. It never deletes
    rows and is a no-op for a fresh database where 0001 already created them.
    """
    Doctor = apps.get_model("clinic", "Doctor")
    connection = schema_editor.connection
    table_name = Doctor._meta.db_table
    existing_tables = set(connection.introspection.table_names())

    if table_name not in existing_tables:
        raise RuntimeError(
            f"Expected database table {table_name!r} to exist. "
            "clinic.0001_initial is marked as applied, but the Doctor table "
            "is missing. Repair the migration history/database before retrying."
        )

    with connection.cursor() as cursor:
        existing_columns = {
            column.name
            for column in connection.introspection.get_table_description(cursor, table_name)
        }

    # These defaults preserve existing doctor rows while matching the current
    # model's effective values. The defaults are database-level safeguards for
    # this repair; the Django model state remains defined by 0001_initial.
    defaults = {
        "category": "general",
        "qualification": "",
        "bio": "",
        "specialties": "",
    }

    for field_name, default in defaults.items():
        if field_name in existing_columns:
            continue
        field = Doctor._meta.get_field(field_name)
        column_sql = schema_editor.quote_name(field.column)
        table_sql = schema_editor.quote_name(table_name)
        type_sql = field.db_type(connection)
        default_sql = connection.ops.quote_value(default)
        schema_editor.execute(
            f"ALTER TABLE {table_sql} ADD COLUMN {column_sql} {type_sql} NOT NULL DEFAULT {default_sql}"
        )


def reverse_repair(apps, schema_editor):
    # Deliberately non-destructive: removing columns could destroy data on an
    # existing database. Reversing this repair therefore leaves the repaired
    # columns in place.
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("clinic", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(repair_doctor_columns, reverse_repair),
    ]
