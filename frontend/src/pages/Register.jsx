
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const REDIRECT_DELAY_MS = 1500;

function validate({ fullName, email, password }) {
  const errors = {};

  if (!fullName.trim()) {
    errors.fullName = "Emri i plotë është i detyrueshëm.";
  } else if (fullName.trim().length < 2) {
    errors.fullName = "Emri duhet të ketë të paktën 2 shkronja.";
  } else if (fullName.trim().length > 100) {
    errors.fullName = "Emri nuk mund të ketë më shumë se 100 karaktere.";
  }

  if (!email.trim()) {
    errors.email = "Email-i është i detyrueshëm.";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Shkruani një email të vlefshëm.";
  } else if (email.trim().length > 255) {
    errors.email = "Email-i nuk mund të ketë më shumë se 255 karaktere.";
  }

  if (!password) {
    errors.password = "Fjalëkalimi është i detyrueshëm.";
  } else if (password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `Fjalëkalimi duhet të ketë të paktën ${MIN_PASSWORD_LENGTH} karaktere.`;
  }

  return errors;
}

async function submitRegister(data) {
  try {
    const response = await api.post("/auth/register", {
      name: data.fullName,
      email: data.email,
      password: data.password,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const serverErrors = error.response.data?.errors;

      if (Array.isArray(serverErrors) && serverErrors.length > 0) {
        throw new Error(serverErrors[0].message);
      }

      if (error.response.status === 409) {
        throw new Error(
          error.response.data?.message ||
            "Ky email është regjistruar më parë."
        );
      }

      throw new Error(
        error.response.data?.message ||
          "Regjistrimi dështoi. Provoni përsëri."
      );
    }

    throw new Error(
      "Serveri nuk është i arritshëm. Provoni përsëri më vonë."
    );
  }
}

function Register() {
  const navigate = useNavigate();
  const redirectTimer = useRef(null);

  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => clearTimeout(redirectTimer.current);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setFormError("");
    setFormSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError("");
    setFormSuccess("");

    const errors = validate(values);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    try {
      await submitRegister({
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      setFormSuccess(
        "Llogaria u krijua me sukses. Po ju ridrejtojmë te hyrja..."
      );

      redirectTimer.current = setTimeout(() => {
        navigate("/login", { replace: true });
      }, REDIRECT_DELAY_MS);
    } catch (error) {
      setFormError(
        error.message || "Regjistrimi dështoi. Provoni përsëri."
      );
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1 className="auth-title">ProfitX</h1>
        <p className="auth-subtitle">Krijoni llogarinë tuaj</p>

        {formError && (
          <div className="auth-alert" role="alert">
            {formError}
          </div>
        )}

        {formSuccess && (
          <div className="auth-success" role="status">
            {formSuccess}
          </div>
        )}

        <div className="auth-field">
          <label htmlFor="fullName">Emri i plotë</label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Emri Mbiemri"
            value={values.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.fullName)}
            disabled={loading}
          />
          {fieldErrors.fullName && (
            <span className="auth-error">{fieldErrors.fullName}</span>
          )}
        </div>

        <div className="auth-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="emri@shembull.com"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.email)}
            disabled={loading}
          />
          {fieldErrors.email && (
            <span className="auth-error">{fieldErrors.email}</span>
          )}
        </div>

        <div className="auth-field">
          <label htmlFor="password">Fjalëkalimi</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder={`Të paktën ${MIN_PASSWORD_LENGTH} karaktere`}
            value={values.password}
            onChange={handleChange}
            aria-invalid={Boolean(fieldErrors.password)}
            disabled={loading}
          />
          {fieldErrors.password && (
            <span className="auth-error">{fieldErrors.password}</span>
          )}
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? "Duke regjistruar..." : "Regjistrohu"}
        </button>

        <p className="auth-footer">
          Keni llogari? <Link to="/login">Hyni këtu</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
