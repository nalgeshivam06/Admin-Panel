import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import AdminNavbar from '../../AdminNavbar';
import { useNavigate } from 'react-router-dom';

const SectionInput = ({ index, control }) => {
  return (
    <div className="mt-6">
      <label htmlFor={`heading${index}`} className="block text-sm font-medium leading-5 text-gray-700">
        Section {index + 1} Heading
      </label>
      <Controller
        name={`sections[${index}].heading`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            id={`heading${index}`}
            type="text"
            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
        )}
      />

      <label htmlFor={`text${index}`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
        Section {index + 1} Text
      </label>
      <Controller
        name={`sections[${index}].text`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <textarea
            {...field}
            id={`text${index}`}
            rows="3"
            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
        )}
      />

      <label htmlFor={`imageUrl${index}`} className="block text-sm font-medium leading-5 text-gray-700 mt-4">
        Section {index + 1} Image URL
      </label>
      <Controller
        name={`sections[${index}].imageUrl`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            id={`imageUrl${index}`}
            type="text"
            className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
        )}
      />
    </div>
  );
};

function ImageChangerForm() {
  const { handleSubmit, control } = useForm();
  const [sectionCount, setSectionCount] = useState(1);
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch('http://localhost:8080/api/createMidInfoSection', {
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
      console.log("error saving mid section", error)
    }
  };

  const addSection = () => {
    setSectionCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <AdminNavbar />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 border rounded-md shadow-md mt-10"
      >
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium leading-5 text-gray-700">
            Title
          </label>
          <Controller
            name="staticContent.title"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="title"
                type="text"
                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
            )}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="subtitle" className="block text-sm font-medium leading-5 text-gray-700">
            Subtitle
          </label>
          <Controller
            name="staticContent.subtitle"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                id="subtitle"
                type="text"
                className="mt-1 p-2 border block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              />
            )}
          />
        </div>

        {[...Array(sectionCount)].map((_, index) => (
          <SectionInput key={index} index={index} control={control} />
        ))}

        <div className="mt-6">
          <button type="button" onClick={addSection} className="text-indigo-600 hover:text-indigo-900">
            Add Section
          </button>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-indigo-500 p-3 rounded-md text-white font-medium focus:outline-none focus:shadow-outline-indigo active:bg-indigo-600"
          >
            Create Image Changer
          </button>
        </div>
      </form>
    </>
  );
}

export default ImageChangerForm;
