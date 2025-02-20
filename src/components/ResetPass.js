import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPass = () => {
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required").min(6, "Too Short!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      const { newPassword } = values;
      const token = window.location.pathname.split("/").pop();

      axios
        .post(`http://localhost:8080/auth/resetPassword/${token}`, { newPassword })
        .then((response) => {
          console.log(response.data.message);
          setTimeout(() => {
            window.location.href = "/login";
          }, 3000);
        })
        .catch(() => {
          toast.error("Your link has expired");
        });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              className={`w-full p-2 border rounded ${formik.touched.newPassword && formik.errors.newPassword ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter new password"
              {...formik.getFieldProps("newPassword")}
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.newPassword}</p>
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              className={`w-full p-2 border rounded ${formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Confirm new password"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
            ) : null}
          </div>
          <button
            type="submit"
            onClick={formik.handleSubmit}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPass;
