import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup
        .string()
        .email("Please enter a valid email format")
        .required("Email is required"),
});

function LearnReactHookForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("React Hook Form Submitted:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>React Hook Form</h2>

            <div>
                <label>Username</label>
                <input {...register("username")} placeholder="Enter username" />
                {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input {...register("email")} placeholder="Enter email" />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default LearnReactHookForm;
