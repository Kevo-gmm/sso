import { useState } from "react";
import { Input } from "../../components/ui/inputs";
import Button from "../../components/ui/btn";
import { postData } from "../../utils/requests";
import { domain_url } from "../../utils";
import { useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);
  let [searchParams] = useSearchParams();

  const token = searchParams.get("token");
  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    setLoading(true);
    try {
      const resp = await postData(`${domain_url}/users/reset-password`, { newPassword, token });
      if (resp.message.includes("successful")) {
        setSuccess(resp.message);
        setResetEmailSent(true);
      } else {
        setError(resp.message);
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <div className="card">
        <div className="card-header text-center py-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-4">
            <i className="fas fa-chart-line fa-lg text-primary"></i>
            <span className="h4 mb-0">
              <span className="fw-light">Trade</span>
              <span className="fw-bold">Control</span>
            </span>
          </div>
          <h2 className="card-title mb-1">Reset your password</h2>
        </div>
        {resetEmailSent ? (
          <div className="m-4">
            <div className="alert p-4 alert-success">{success}</div>
          </div>
        ) : (
          <div className="card-body">
            <div className="tab-content">
              <Input
                label="New Password"
                type="password"
                id="password"
                name="password"
                placeholder="************"
                disabled={loading}
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <Button type="button" className="btn btn-primary w-100" onClick={handleSubmit} loading={loading} disabled={loading}>
                Reset Password
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
