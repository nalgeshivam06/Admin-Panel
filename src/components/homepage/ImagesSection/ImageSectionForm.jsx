import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

function ImageSectionForm() {
    const { handleSubmit, control } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        try {
          const response = await fetch(`${BASE_URL}/api/createImgSection`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const res = await response.json();
        window.alert(res.message)
        navigate('/homePage')
        } catch (error) {
          console.log("error saving image section", error)
        }
      };

    return (
        <>
            <AdminNavbar />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10">
                <div className="mt-6">
                    <label htmlFor={`img`} className="block text-sm font-medium leading-5 text-gray-700">
                        Image URL
                    </label>
                    <Controller
                        name={`img`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />

                    <label htmlFor={`text`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Image Text
                    </label>
                    <Controller
                        name={`text`}
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <textarea
                                {...field}
                                rows="3"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
                    >
                        Create Image
                    </button>
                </div>
            </form>
        </>
    );
}

export default ImageSectionForm;
