import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../../../config';

function CatDescriptionForm() {
    const { handleSubmit, control, register } = useForm();
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
    };

    const handleImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImages(`img${index}`, imageUrl);
        }
    };

    const categoryOptions = ['Wallpaper', 'Flooring', 'Blinds', 'Curtains', 'Sport & Gym Flooring']

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            data.circles.forEach((circle, index) => {
                formData.append(`circles[${index}].productTitle`, circle.productTitle);
                formData.append(`circles[${index}].productCategory`, circle.productCategory);
                formData.append(`circles[${index}].productPrice`, Number(circle.productPrice));
                formData.append(`circles[${index}].topPosition`, Number(circle.topPosition));
                formData.append(`circles[${index}].leftPosition`, Number(circle.leftPosition));
                formData.append(`circles[${index}].productLink`, circle.productLink);
            });

            formData.append('category', selectedCategory);

            // Add images to FormData
            for (let i = 1; i <= 4; i++) {
                const fileInput = document.getElementById(`img${i}`);
                const file = fileInput?.files[0];
                if (file) {
                    formData.append(`image`, file);
                }
            }

            formData.append('imgTitle', data.imgTitle);
            formData.append('reviewTitle', data.reviewTitle);
            formData.append('review', data.review);
            // formData.append('profilePic', data.profilePic);
            formData.append('linkedln', data.linkedln);
            formData.append('occupation', data.occupation);

            const response = await fetch(`${BASE_URL}/api/categorydescription`, {
                method: 'POST',
                headers: {
                },
                body: formData,
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

                    <label
                        htmlFor="imgTitle"
                        className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                    >
                        Image Title
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="text"
                                {...register('imgTitle', {
                                    required: 'imgTitle is required',
                                })}
                                id="imgTitle"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>


                    <label
                        htmlFor="img1"
                        className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                    >
                        Image Source
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="file"
                                {...register('img1', {
                                    required: 'name is required',
                                })}
                                id="img1"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 1)}
                            />
                        </div>
                    </div>

                    <label
                        htmlFor="reviewTitle"
                        className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                    >
                        Review Title
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="text"
                                {...register('reviewTitle', {
                                    required: 'reviewTitle is required',
                                })}
                                id="reviewTitle"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>

                    <label
                        htmlFor="review"
                        className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                    >
                        Review
                    </label>
                    <div className="mt-2 mb-4">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <textarea
                                type="text"
                                {...register('review', {
                                    required: 'review is required',
                                })}
                                id="review"
                                className=" block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>

                    <label
                        htmlFor="img2"
                        className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                    >
                        User Profile Pic
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="file"
                                {...register('img2', {
                                    required: 'name is required',
                                })}
                                id="img2"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 2)}
                            />
                        </div>
                    </div>

                    <label
                        htmlFor="occupation"
                        className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                    >
                        Occupation
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="text"
                                {...register('occupation', {
                                    required: 'occupation is required',
                                })}
                                id="occupation"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>

                    <label
                        htmlFor="linkedln"
                        className="block text-sm font-medium leading-6 text-gray-900 font-bold"
                    >
                        Linkedln url
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                            <input
                                type="text"
                                {...register('linkedln', {
                                    required: 'linkedln is required',
                                })}
                                id="linkedln"
                                className="block flex-1 border-0 bg-transparent p-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"

                            />
                        </div>
                    </div>


                    <div className="mt-4">
                        <label htmlFor="category">Category:</label>
                        <select id="category" className='ml-2 border bg-transparent p-2 border-gray-400 rounded' onChange={handleCategoryChange} value={selectedCategory}>
                            <option value="">-- Select Category --</option>
                            {categoryOptions.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    {/* ------------------------ */}


                    <label className="block text-sm font-medium leading-5 text-gray-700 mt-4">Circles</label>
                    <Controller
                        name={`circles`}
                        control={control}
                        defaultValue={[{
                            productTitle: '',
                            productCategory: '',
                            productPrice: 0,
                            topPosition: 0,
                            leftPosition: 0,
                            productLink: '',
                        }]}
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


                                        <label htmlFor={`circles[${index}].productPrice`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
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
                                <button type="button"
                                    onClick={() => {
                                        const newCircles = [
                                            ...field.value,
                                            {
                                                productTitle: '',
                                                productCategory: '',
                                                productPrice: 0,
                                                topPosition: 0,
                                                leftPosition: 0,
                                                productLink: '',
                                            },
                                        ];
                                        field.onChange(newCircles);
                                    }}
                                    className="text-indigo-600 hover:text-indigo-900 mt-4">
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
                        Create Slider
                    </button>
                </div>
            </form>
        </>
    );
}

export default CatDescriptionForm;
