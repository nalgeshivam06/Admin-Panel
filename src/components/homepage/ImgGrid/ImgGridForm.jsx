import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

function ImgGridForm() {
    const { handleSubmit, control } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            console.log(data);
            const response = await fetch(`${BASE_URL}/api/gridImg`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            window.alert(responseData.message);
            navigate('/homePage')
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <AdminNavbar />
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10">
                <div className="mt-6">

                    <label htmlFor={`imgSrc`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Image Source
                    </label>
                    <Controller
                        name={`imgSrc`}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />

                    <label htmlFor={`category`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                        Category
                    </label>
                    <Controller
                        name={`category`}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                            />
                        )}
                    />

                    <label className="block text-sm font-medium leading-5 text-gray-700 mt-4">Circles</label>
                    <Controller
                        name={`circles`}
                        control={control}
                        defaultValue={[]}
                        render={({ field }) => (
                            <div>
                                {field.value.map((circle, index) => (

                                    <div key={index} className="mt-4">

                                        <label htmlFor={`circles[${index}].productTitle`} className="block text-sm font-medium leading-5 text-gray-700">
                                            Circle {index + 1} Product Title
                                        </label>
                                        <Controller
                                            name={`circles[${index}].productTitle`}
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


                                        <label htmlFor={`circles[${index}].productCategory`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Product Category
                                        </label>
                                        <Controller
                                            name={`circles[${index}].productCategory`}
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


                                        <label htmlFor={`circles[${index}].productCategory`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Product Price
                                        </label>
                                        <Controller
                                            name={`circles[${index}].productPrice`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="number"
                                                    className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                                />
                                            )}
                                        />

                                        <label htmlFor={`circles[${index}].topPosition`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Top Position
                                        </label>
                                        <Controller
                                            name={`circles[${index}].topPosition`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="number"
                                                    className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                                />
                                            )}
                                        />

                                        <label htmlFor={`circles[${index}].leftPosition`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Left Position
                                        </label>
                                        <Controller
                                            name={`circles[${index}].leftPosition`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <input
                                                    {...field}
                                                    type="number"
                                                    className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                                />
                                            )}
                                        />

                                        <label htmlFor={`circles[${index}].productLink`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
                                            Circle {index + 1} Product Link
                                        </label>
                                        <Controller
                                            name={`circles[${index}].productLink`}
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
                                    </div>
                                ))}
                                <button type="button" onClick={() => field.onChange([...field.value, {}])} className="text-indigo-600 hover:text-indigo-900 mt-4">
                                    Add Circle
                                </button>
                            </div>
                        )}
                    />
                </div>

                <div className="mt-8">
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
                    >
                        Create Img Grid
                    </button>
                </div>
            </form>
        </>
    );
}

export default ImgGridForm;
