import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  adminLogin,
  adminLogout,
  adminRequest,
  isAdminLoggedIn,
  mediaUrl,
} from "../api";
import "../styles/AdminPage.css";

/* =========================================================
   ADMIN RESOURCES
   Only the required 7 sections are included.
   ========================================================= */

const resources = {
  doctors: {
    label: "Doctors",
    singular: "Doctor",
    columns: [
      "name",
      "category",
      "qualification",
      "order",
      "is_active",
    ],
    fields: [
      ["name", "Name"],
      ["specialty", "Specialty"],
      ["qualification", "Qualification"],

      [
        "category",
        "Category",
        "select",
        [
          ["medical_director", "Medical Director"],
          ["specialist", "Specialist Doctor"],
          ["general", "General Dentist"],
        ],
      ],

      ["bio", "Bio", "textarea"],
      [
        "specialties",
        "Specialist treatments (one per line)",
        "textarea",
      ],
      ["order", "Display order", "number"],
      ["is_active", "Active", "checkbox"],
      ["photo", "Photo", "file", "image"],
    ],
  },

  // treatments: {
  //   label: "Treatments",
  //   singular: "Treatment",
  //   columns: ["name", "slug", "order"],
  //   fields: [
  //     ["name", "Name"],
  //     ["slug", "Slug"],
  //     ["description", "Description", "textarea"],
  //     ["order", "Display order", "number"],
  //     ["photo", "Image", "file", "image"],
  //   ],
  // },

//   treatments: {
//   label: "Treatments",
//   singular: "Treatment",
//   columns: ["name", "order"],
//   fields: [
//     ["name", "Name"],
//     ["order", "Display order", "number"],
//     ["photo", "Image", "file", "image"],
//   ],
// },

treatments: {
  label: "Treatments",
  singular: "Treatment",
  columns: ["name", "order"],
  fields: [
    ["name", "Name"],
    ["order", "Display order", "number"],
    ["image", "Image", "file", "image"],
  ],
},

  services: {
    label: "Services",
    singular: "Service",
    columns: ["name", "slug", "order"],
    fields: [
      ["name", "Name"],
      ["slug", "Slug"],
      ["description", "Description", "textarea"],
      ["order", "Display order", "number"],
      ["icon", "Icon", "file", "image"],
      ["photo", "Photo", "file", "image"],
    ],
  },

  facilities: {
    label: "Facilities",
    singular: "Facility",
    columns: ["name", "order"],
    fields: [
      ["name", "Name"],
      ["description", "Description", "textarea"],
      ["order", "Display order", "number"],
      ["photo", "Photo", "file", "image"],
    ],
  },

  testimonials: {
    label: "Testimonials",
    singular: "Testimonial",
    columns: [
      "patient_name",
      "role_label",
      "rating",
      "order",
    ],
    fields: [
      ["patient_name", "Patient name"],
      ["role_label", "Label"],
      ["quote", "Testimonial", "textarea"],
      ["rating", "Rating (1–5)", "number"],
      ["order", "Display order", "number"],
    ],
  },

  gallery: {
    label: "Gallery",
    singular: "Gallery image",
    columns: ["caption", "order"],
    fields: [
      ["caption", "Caption"],
      ["order", "Display order", "number"],
      ["photo", "Photo", "file", "image"],
    ],
  },
};

/* =========================================================
   ADMIN SIDEBAR
   ========================================================= */

const ADMIN_SECTIONS = [
  ["doctors", "Doctors"],
  ["treatments", "Treatments"],
  ["services", "Services"],
  ["facilities", "Facilities"],
  ["gallery", "Gallery"],
  ["testimonials", "Testimonials"],
  ["video", "Video"],
];

/* =========================================================
   LOGIN
   ========================================================= */

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    setBusy(true);
    setError("");

    try {
      await adminLogin(username, password);

      navigate("/admin/doctors", {
        replace: true,
      });
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="login-card">
        <div className="admin-mark">G</div>

        <p className="admin-eyebrow">
          GENET DENTAL
        </p>

        <h1>Content Admin</h1>

        <p className="muted">
          Sign in to manage the seven website content
          sections.
        </p>

        <form
          onSubmit={submit}
          className="admin-form"
        >
          <label>
            Username

            <input
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              autoComplete="username"
              required
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              autoComplete="current-password"
              required
            />
          </label>

          {error && (
            <div className="alert error">
              {error}
            </div>
          )}

          <button
            className="admin-primary"
            disabled={busy}
          >
            {busy
              ? "Signing in…"
              : "Sign in"}
          </button>
        </form>

        <p className="login-help">
          Use the authorized Django staff account.
          The password is never stored in the frontend.
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   CRUD PAGE
   ========================================================= */

function CrudPage({ resource }) {
  const cfg = resources[resource];

  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    setLoading(true);
    setError("");

    try {
      const data = await adminRequest(
        `${resource}/`
      );

      setItems(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [resource]);

  /* =======================================================
     SAVE
     ======================================================= */

  async function save(values) {
    const fd = new FormData();

    const fileFields = new Set(
      cfg.fields
        .filter(([, , type]) => type === "file")
        .map(([name]) => name)
    );

    Object.entries(values).forEach(
      ([key, value]) => {
        if (fileFields.has(key)) {
          if (value instanceof File) {
            fd.append(key, value);
          }

          return;
        }

        if (
          value !== undefined &&
          value !== null
        ) {
          fd.append(
            key,
            String(value)
          );
        }
      }
    );

    const path = values.id
      ? `${resource}/${values.id}/`
      : `${resource}/`;

    await adminRequest(path, {
      method: values.id
        ? "PATCH"
        : "POST",
      body: fd,
    });

    setEditing(null);

    setNotice(
      `${cfg.singular} saved successfully.`
    );

    await load();
  }

  /* =======================================================
     DELETE
     ======================================================= */

  async function remove(item) {
    const name =
      item.name ||
      item.patient_name ||
      item.caption ||
      "this item";

    if (
      !window.confirm(
        `Delete ${name}? This cannot be undone.`
      )
    ) {
      return;
    }

    try {
      await adminRequest(
        `${resource}/${item.id}/`,
        {
          method: "DELETE",
        }
      );

      setNotice(
        `${cfg.singular} deleted.`
      );

      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="page-title">
        <div>
          <p className="admin-eyebrow">
            CONTENT MANAGEMENT
          </p>

          <h1>{cfg.label}</h1>

          <p className="muted">
            Manage the content published on
            the Genet Dental website.
          </p>
        </div>

        <button
          className="admin-primary"
          onClick={() =>
            setEditing({})
          }
        >
          + Add {cfg.singular}
        </button>
      </div>

      {notice && (
        <div className="alert success">
          {notice}
        </div>
      )}

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {editing && (
        <Editor
          cfg={cfg}
          initial={editing}
          onCancel={() =>
            setEditing(null)
          }
          onSave={save}
        />
      )}

      {resource === "gallery" ? (
        <GalleryGrid
          items={items}
          loading={loading}
          onEdit={setEditing}
          onDelete={remove}
        />
      ) : (
        <Table
          items={items}
          loading={loading}
          cfg={cfg}
          onEdit={setEditing}
          onDelete={remove}
        />
      )}
    </div>
  );
}

/* =========================================================
   TABLE
   ========================================================= */

function Table({
  items,
  loading,
  cfg,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="table-card empty">
        Loading…
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="table-card empty">
        No {cfg.label.toLowerCase()} yet.
        Add the first one.
      </div>
    );
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            {cfg.columns.map((column) => (
              <th key={column}>
                {labelFor(column)}
              </th>
            ))}

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {cfg.columns.map(
                (column) => (
                  <td key={column}>
                    {renderCell(
                      column,
                      item[column]
                    )}
                  </td>
                )
              )}

              <td className="actions">
                <button
                  onClick={() =>
                    onEdit(item)
                  }
                >
                  Edit
                </button>

                <button
                  className="danger"
                  onClick={() =>
                    onDelete(item)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   GALLERY GRID
   ========================================================= */

function GalleryGrid({
  items,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="table-card empty">
        Loading gallery…
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="table-card empty">
        No gallery images yet.
      </div>
    );
  }

  return (
    <div className="gallery-admin-grid">
      {items.map((item) => (
        <article
          className="gallery-admin-card"
          key={item.id}
        >
          {item.photo ? (
            <img
              src={mediaUrl(item.photo)}
              alt={
                item.caption ||
                "Gallery image"
              }
            />
          ) : (
            <div className="gallery-placeholder">
              No image
            </div>
          )}

          <div className="gallery-admin-body">
            <strong>
              {item.caption ||
                "Untitled image"}
            </strong>

            <span>
              Order: {item.order ?? 0}
            </span>

            <div className="actions">
              <button
                onClick={() =>
                  onEdit(item)
                }
              >
                Edit
              </button>

              <button
                className="danger"
                onClick={() =>
                  onDelete(item)
                }
              >
                Delete
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* =========================================================
   EDITOR
   ========================================================= */

function Editor({
  cfg,
  initial,
  onCancel,
  onSave,
}) {
  const [values, setValues] =
    useState({
      ...initial,
    });

  const [busy, setBusy] =
    useState(false);

  const [error, setError] =
    useState("");

  async function submit(event) {
    event.preventDefault();

    setBusy(true);
    setError("");

    try {
      await onSave(values);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="editor-card">
      <div className="editor-head">
        <div>
          <p className="admin-eyebrow">
            {initial.id
              ? "EDIT"
              : "NEW"}
          </p>

          <h2>
            {initial.id
              ? `Edit ${cfg.singular}`
              : `Add ${cfg.singular}`}
          </h2>
        </div>

        <button
          type="button"
          className="icon-btn"
          onClick={onCancel}
        >
          ×
        </button>
      </div>

      <form
        className="admin-form editor-grid"
        onSubmit={submit}
      >
        {cfg.fields.map(
          ([
            name,
            label,
            type,
            accept,
            options,
          ]) => (
            <Field
              key={name}
              name={name}
              label={label}
              type={type}

              /*
               * File fields:
               * 4th value = accept
               *
               * Select fields:
               * 4th value = options
               */
              accept={
                type === "file"
                  ? accept
                  : undefined
              }

              options={
                type === "select"
                  ? accept
                  : options
              }

              value={values[name]}

              setValue={(value) =>
                setValues(
                  (state) => ({
                    ...state,
                    [name]: value,
                  })
                )
              }
            />
          )
        )}

        {error && (
          <div className="alert error full">
            {error}
          </div>
        )}

        <div className="editor-actions full">
          <button
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="admin-primary"
            disabled={busy}
          >
            {busy
              ? "Saving…"
              : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  name,
  label,
  type,
  accept,
  options,
  value,
  setValue,
}) {
  /* =======================================================
     FILE
     ======================================================= */

  if (type === "file") {
    return (
      <label className="upload-field">
        {label}

        <div className="upload-box">
          {typeof value === "string" &&
            value && (
              <img
                src={mediaUrl(value)}
                alt="Current"
              />
            )}

          <input
            type="file"
            accept={
              accept === "image"
                ? "image/*"
                : "video/*"
            }
            onChange={(event) =>
              setValue(
                event.target.files?.[0] ||
                  ""
              )
            }
          />

          <span>
            {value?.name ||
              (value
                ? "Choose a replacement"
                : "Choose file")}
          </span>
        </div>
      </label>
    );
  }

  /* =======================================================
     TEXTAREA
     ======================================================= */

  if (type === "textarea") {
    return (
      <label>
        {label}

        <textarea
          rows="5"
          value={value ?? ""}
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
        />
      </label>
    );
  }

  /* =======================================================
     CHECKBOX
     ======================================================= */

  if (type === "checkbox") {
    return (
      <label className="check-field">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) =>
            setValue(
              event.target.checked
            )
          }
        />

        {" "}
        {label}
      </label>
    );
  }

  /* =======================================================
     SELECT
     ======================================================= */

  if (type === "select") {
    const safeOptions =
      Array.isArray(options)
        ? options
        : [];

    return (
      <label>
        {label}

        <select
          value={value ?? ""}
          onChange={(event) =>
            setValue(
              event.target.value
            )
          }
        >
          {safeOptions.map(
            ([optionValue, optionText]) => (
              <option
                value={optionValue}
                key={optionValue}
              >
                {optionText}
              </option>
            )
          )}
        </select>
      </label>
    );
  }

  /* =======================================================
     NORMAL INPUT
     ======================================================= */

  return (
    <label>
      {label}

      <input
        type={
          type === "number"
            ? "number"
            : "text"
        }
        value={value ?? ""}
        onChange={(event) =>
          setValue(
            type === "number"
              ? Number(
                  event.target.value
                )
              : event.target.value
          )
        }
      />
    </label>
  );
}

/* =========================================================
   VIDEO ADMIN PAGE
   ========================================================= */

function VideoPage() {
  const [info, setInfo] =
    useState(null);

  const [file, setFile] =
    useState(null);

  const [busy, setBusy] =
    useState(false);

  const [error, setError] =
    useState("");

  const [notice, setNotice] =
    useState("");

  async function load() {
    try {
      const data =
        await adminRequest(
          "clinic-info/"
        );

      setInfo(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  /* =======================================================
     UPLOAD / REPLACE VIDEO
     ======================================================= */

  async function upload() {
    if (!file) {
      setError(
        "Choose a video file first."
      );

      return;
    }

    if (!info?.id) {
      setError(
        "Clinic information could not be loaded."
      );

      return;
    }

    setBusy(true);
    setError("");
    setNotice("");

    const fd = new FormData();

    fd.append(
      "excellence_video",
      file
    );

    try {
      await adminRequest(
        `clinic-info/${info.id}/`,
        {
          method: "PATCH",
          body: fd,
        }
      );

      setFile(null);

      setNotice(
        "Homepage video replaced successfully."
      );

      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  /* =======================================================
     DELETE VIDEO
     ======================================================= */

  async function remove() {
    if (
      !window.confirm(
        "Delete the current homepage video?"
      )
    ) {
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");

    try {
      await adminRequest(
        "clinic-info/video/",
        {
          method: "DELETE",
        }
      );

      setNotice(
        "Homepage video deleted."
      );

      await load();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (!info) {
    return (
      <div className="table-card empty">
        Loading video…
      </div>
    );
  }

  const url =
    info.excellence_video
      ? mediaUrl(
          info.excellence_video
        )
      : "";

  return (
    <div>
      <div className="page-title">
        <div>
          <p className="admin-eyebrow">
            HOMEPAGE MEDIA
          </p>

          <h1>Video</h1>

          <p className="muted">
            Manage the video displayed in
            the Excellence in Dental Care
            section.
          </p>
        </div>
      </div>

      <div className="settings-card video-manager">
        {url ? (
          <video
            className="admin-video"
            src={url}
            controls
            playsInline
          />
        ) : (
          <div className="video-empty">
            No homepage video is currently
            uploaded.
          </div>
        )}

        <label className="video-upload">
          Upload / replace video

          <input
            type="file"
            accept="video/mp4,video/webm,video/quicktime,video/*"
            onChange={(event) =>
              setFile(
                event.target.files?.[0] ||
                  null
              )
            }
          />

          <span>
            {file?.name ||
              "Choose a video"}
          </span>
        </label>

        <div className="video-actions">
          <button
            className="admin-primary"
            onClick={upload}
            disabled={
              busy || !file
            }
          >
            {busy
              ? "Working…"
              : "Upload / Replace"}
          </button>

          {url && (
            <button
              className="danger-button"
              onClick={remove}
              disabled={busy}
            >
              Delete Video
            </button>
          )}
        </div>

        {notice && (
          <div className="alert success">
            {notice}
          </div>
        )}

        {error && (
          <div className="alert error">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function labelFor(key) {
  return key
    .replaceAll("_", " ")
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase()
    );
}

function renderCell(key, value) {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "—";
  }

  if (key === "specialties") {
    return String(value)
      .split("\n")
      .join(", ");
  }

  if (
    typeof value === "string" &&
    value.length > 70
  ) {
    return `${value.slice(0, 70)}…`;
  }

  return String(value);
}

/* =========================================================
   ADMIN PAGE
   ========================================================= */

export default function AdminPage() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [logged, setLogged] =
    useState(
      isAdminLoggedIn()
    );

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const section =
    location.pathname
      .replace(/^\/admin\/?/, "")
      .replace(/\/$/, "") ||
    "doctors";

  const validSection =
    resources[section]
      ? section
      : section === "video"
      ? "video"
      : "doctors";

  const go = (key) => {
    navigate(`/admin/${key}`);

    setMobileOpen(false);
  };

  useEffect(() => {
    setLogged(
      isAdminLoggedIn()
    );
  }, [location.pathname]);

  const content = useMemo(
    () =>
      validSection === "video"
        ? <VideoPage />
        : (
          <CrudPage
            resource={validSection}
          />
        ),
    [validSection]
  );

  if (!logged) {
    return <Login />;
  }

  return (
    <div className="admin-shell">
      {mobileOpen && (
        <button
          className="admin-backdrop"
          aria-label="Close menu"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <aside
        className={`admin-sidebar ${
          mobileOpen
            ? "mobile-open"
            : ""
        }`}
      >
        <div className="brand">
          <div className="admin-mark">
            G
          </div>

          <div>
            <strong>
              GENET DENTAL
            </strong>

            <small>
              CONTENT ADMIN
            </small>
          </div>
        </div>

        <nav aria-label="Content management">
          {ADMIN_SECTIONS.map(
            ([key, label]) => (
              <button
                key={key}
                className={
                  validSection === key
                    ? "active"
                    : ""
                }
                onClick={() =>
                  go(key)
                }
              >
                {label}
              </button>
            )
          )}
        </nav>

        <button
          className="logout"
          onClick={() => {
            adminLogout();

            setLogged(false);

            navigate(
              "/admin",
              {
                replace: true,
              }
            );
          }}
        >
          Sign out
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-mobile-head">
          <button
            className="admin-menu-button"
            onClick={() =>
              setMobileOpen(
                (value) => !value
              )
            }
            aria-label="Open admin menu"
          >
            ☰
          </button>

          <strong>
            Genet Dental Admin
          </strong>
        </div>

        {content}
      </main>
    </div>
  );
}