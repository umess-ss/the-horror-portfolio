import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Please enter a valid email format")
        .required("Email is required"),
});

function LearnFormik() {
    console.log("Rendered inside formik")
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log("Formik Submitted:", values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2>Formik</h2>

            <div>
                <label>Username</label>
                <input {...formik.getFieldProps("username")} placeholder="Enter username" />
                {formik.touched.username && formik.errors.username ? (
                    <p style={{ color: "red" }}>{formik.errors.username}</p>
                ) : null}
            </div>

            <div>
                <label>Email</label>
                <input {...formik.getFieldProps("email")} placeholder="Enter email" />
                {formik.touched.email && formik.errors.email ? (
                    <p style={{ color: "red" }}>{formik.errors.email}</p>
                ) : null}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default LearnFormik;
