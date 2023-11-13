import { useContext } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { AuthContext } from "../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { signUp, googleSignIn, githubSignIn, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signUp(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photo).then(() => {
          reset();
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };
  const handleGithubSignIn = () => {
    githubSignIn()
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error));
  };
  return (
    <section className="px-4 py-24 mx-auto max-w-7xl">
      <div className="w-full mx-auto space-y-5 sm:w-8/12 md:w-6/12 lg:w-[500px] border p-5 rounded-lg shadow-xl">
        <h1 className="text-4xl font-semibold text-center text-gray-900">
          Sign up
        </h1>
        <div className="pb-6 space-y-2 border-b border-gray-200">
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 flex items-center justify-center gap-2 font-semibold text-white bg-lime-500 hover:bg-lime-600 rounded-lg"
          >
            <BsGoogle />
            Continue with Google
          </button>
          <button
            onClick={handleGithubSignIn}
            className="w-full py-3 flex items-center justify-center gap-2 font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          >
            <BsGithub />
            Continue with Github
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">
              Name
            </span>
            <input
              className="w-full p-2 border rounded-lg outline-purple-600"
              type="text"
              placeholder="Your full name"
              name="name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </label>

          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">
              Your Email
            </span>
            <input
              className="w-full p-2 border rounded-lg outline-purple-600"
              type="email"
              name="email"
              placeholder="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </label>

          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">
              Photo
            </span>
            <input
              className="w-full p-2 border rounded-lg outline-purple-600"
              type="text"
              placeholder="Your profile photo url"
              name="photo"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <span className="text-red-600">Photo url is required</span>
            )}
          </label>

          <label className="block">
            <span className="block mb-1 text-sm font-medium text-gray-700">
              Create a password
            </span>
            <input
              className="w-full p-2 border rounded-lg outline-purple-600"
              type="password"
              name="password"
              placeholder="••••••••"
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </label>
          <input
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-lg rounded-lg"
            value="Sign Up"
          />
        </form>
        <p className="my-8 text-xs font-medium text-center text-gray-700">
          By clicking "Sign Up" you agree to our
          <a href="#" className="text-purple-700 hover:text-purple-900 mx-1">
            Terms of Service
          </a>
          and
          <a href="#" className="text-purple-700 hover:text-purple-900 ml-1">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default Register;
