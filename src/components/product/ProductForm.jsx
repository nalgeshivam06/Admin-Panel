import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllCategories,
  selectAllLabels,

  createProductAsync,
  updateProductAsync,
} from '../../Features/Product/productSlice';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  Button,
} from "@material-tailwind/react";

const DimensionInput = ({ label, value, unit, onChange }) => {
  return (
    <div className="sm:col-span-2">
      <label>{label}:</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange({ value: e.target.value, unit })}
        className='ml-2 border p-2'
      />
      <select value={unit} onChange={(e) => onChange({ value, unit: e.target.value })}>
        <option value="mm">mm</option>
        <option value="cm">cm</option>
        <option value="m">m</option>
        <option value="in">in</option>
        <option value="ft">ft</option>
      </select>
    </div>
  );
};

const ColorCheckbox = ({ color, isChecked, onChange }) => {
  return (
    <label key={color} className="inline-flex items-center mt-1">
      <input
        type="checkbox"
        value={color}
        checked={isChecked}
        onChange={onChange}
        className="form-checkbox h-5 w-5 text-orange-600"
      />
      <span className="ml-1 text-gray-700 mr-4">{color}</span>
    </label>
  );
};

function ProductForm() {

  // form related 
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  // Redux state related
  const categories = useSelector(selectAllCategories);
  const labels = useSelector(selectAllLabels);
  const params = useParams();
  const dispatch = useDispatch();

  // -------------------------------------------------

  const roomOptions = ["Living Room", "Bedroom", "Dining Room", "Bathroom", "Balcony", "Office Room", "Guest Room", "Pooja Room", "Kids Room", "Kitchen"];

  const categoryOptions = {
    "Wallpaper": [
      "3D", "Abstract", "Animals & Birds", "Flock & Luxury", "Brick & Stone", "Customize",
      "Striped", "Flower & Trees", "Vintage", "Art Deco", "Geometric", "Kid", "Modern",
      "Plain & Texture", "Traditional", "Wood"
    ],
    "Flooring": [
      "Carpet", "Carpet Tiles", "Vinyl Floor", "Luxury Vinyl Plank", "Laminate", "Wooden Floor", "Deck Wood"
    ],
    "Blinds": [
      "Vertical Blinds", "Roller Blinds", "Zebra Blinds", "Shutter Blinds", "Wooden Blinds"
    ],
    "Curtains": [
      "Abstract", "Geometric", "Plains & Textures", "Leave", "Floral"
    ],
    "Sport & Gym Flooring": [
      "Artificial Grass", "Interlocking Mat", "Rubber Tiles", "Vinyl Sports Floors"
    ]
  };

  // --

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);
  const [availableColors, setAvailableColors] = useState([]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (e) => {
    const subcategory = e.target.value;
    setSelectedSubcategory(subcategory);
  };

  // --

  const [dimensions, setDimensions] = useState({
    length: { value: '', unit: 'mm' },
    width: { value: '', unit: 'mm' },
    thickness: { value: '', unit: 'mm' },
  });

  const handleDimensionChange = (dimension, newValue) => {
    setDimensions((prevDimensions) => ({
      ...prevDimensions,
      [dimension]: newValue,
    }));
  };

  // --

  useEffect(() => {  // Fetch colors based on the selected category
    if (selectedCategory) {
      const colorsForCategory = getColorsForCategory(selectedCategory);
      setAvailableColors(colorsForCategory);
    } else {
      setAvailableColors([]);
    }
  }, [selectedCategory]);

  const getColorsForCategory = (category) => {
    switch (category) {
      case 'Flooring':
        return ['Oak Brown', 'Maple Red', 'Cherry Blossom', 'Walnut', 'Teak'];
      case 'Wallpaper':
        return ['Sky Blue', 'Forest Green', 'Sunset Orange', 'Rose Pink', 'Charcoal Gray'];
      default:
        return [];
    }
  };

  const handleColorChange = (e) => {
    const color = e.target.value;
    if (selectedColors.includes(color)) {
      setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
    } else {
      setSelectedColors((prevColors) => [...prevColors, color]);
    }
  };

  
  return (
    <form
      noValidate

      // submit method of the form 💥
      onSubmit={handleSubmit(async (data) => {

        const productData = {
          title: data.title,
          patternNumber: data.patternNumber,
          room: data.room,
          collection: data.collection,
          color: selectedColors,
          designStyle: data.designStyle,
          category: selectedCategory,
          subCategory: selectedSubcategory,
          units: data.units,
          unitType: data.unitType,
          totalPricePerUnit: data.totalPricePerUnit,
          perUnitType: data.perUnitType,
          perUnitPrice: parseFloat(data.perUnitPrice),
          dimensions: {
            length: {
              value: parseFloat(dimensions.length.value),
              unit: dimensions.length.unit,
            },
            width: {
              value: parseFloat(dimensions.width.value),
              unit: dimensions.width.unit,
            },
            thickness: {
              value: parseFloat(dimensions.thickness.value),
              unit: dimensions.thickness.unit,
            },
          },
          images: [data.img1, data.img2, data.img3, data.img4].filter(url => url),
        };


        if (params.id) {
          product.id = params.id;
          dispatch(updateProductAsync(productData));
          window.alert("Product updated successfully...!")
          reset();
        } else {
          console.log(productData);
          dispatch(createProductAsync(productData));
          window.alert("New Product created successfully...!")
          reset();
        }
      })}
    >

      <div className="space-y-12 bg-white p-6 md:p-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add a Product
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Product Title*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('title', {
                      required: 'name is required',
                    })}
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="patternNumber"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                pattern Number*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('patternNumber', {
                      required: 'patternNumber is required',
                    })}
                    id="patternNumber"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="room" className="block text-sm font-medium leading-6 text-gray-900">
                Room
              </label>
              <select {...register('room')} id="room" className="block w-full mt-1 border-0 bg-transparent">
                <option value="">-- Select Room --</option>
                {roomOptions.map((room, index) => (
                  <option key={index} value={room}>{room}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="collection"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Collection*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('collection', {
                      required: 'name is required',
                    })}
                    id="collection"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 my-6">
              <label htmlFor="category">Category:</label>
              <select id="category" className='ml-2 border p-1' onChange={handleCategoryChange} value={selectedCategory}>
                <option value="">-- Select Category --</option>
                {Object.keys(categoryOptions).map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {selectedCategory && (
              <div className="sm:col-span-3">
                <label htmlFor="subcategory">Subcategory:</label>
                <select id="subcategory" className='ml-2 p-1 border' onChange={handleSubcategoryChange} value={selectedSubcategory}>
                  <option value="">-- Select Subcategory --</option>
                  {categoryOptions[selectedCategory].map((subcategory, index) => (
                    <option key={index} value={subcategory}>{subcategory}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            {selectedCategory && availableColors.length > 0 && (
              <div className="sm:col-span-3">
                <label htmlFor="colors">Colors:</label>
                <div>
                  {availableColors.map((color) => (
                    <ColorCheckbox
                      key={color}
                      color={color}
                      isChecked={selectedColors.includes(color)}
                      onChange={handleColorChange}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>



          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <DimensionInput
              label="Length"
              value={dimensions.length.value}
              unit={dimensions.length.unit}
              onChange={(newValue) => handleDimensionChange('length', newValue)}
            />
            <DimensionInput
              label="Width"
              value={dimensions.width.value}
              unit={dimensions.width.unit}
              onChange={(newValue) => handleDimensionChange('width', newValue)}
            />
            <DimensionInput
              label="Thickness"
              value={dimensions.thickness.value}
              unit={dimensions.thickness.unit}
              onChange={(newValue) => handleDimensionChange('thickness', newValue)}
            />

            <div className='mb-4'>
              <p className='bold'>Selected Dimensions:</p>
              <p><b className='mr-1'>Length:</b> {dimensions.length.value} {dimensions.length.unit}</p>
              <p><b className='mr-1'>Width:</b> {dimensions.width.value} {dimensions.width.unit}</p>
              <p><b className='mr-1'>Thickness: </b>{dimensions.thickness.value} {dimensions.thickness.unit}</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="unitType">Unit Type</label>
              <select
                id="unitType"
                {...register('unitType', {
                  required: 'Unit Type is required',
                })}
                className="ml-2 p-1 border"
              >
                <option value="">--Select Unit Type--</option>
                {['sqft', 'box', 'pcs', 'mtr'].map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="units">Units</label>
              <input
                type="number"
                id="units"
                {...register('units', {
                  required: 'Units are required',
                  min: 1,
                })}
                className="ml-2 p-1 border"
              />
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-4">
            <div className="sm:col-span-2">
              <label htmlFor="perUnitType">Per Unit Type</label>
              <select
                id="perUnitType"
                {...register('perUnitType', {
                  required: 'Per Unit Type is required',
                })}
                className="ml-2 p-1 border"
              >
                <option value="">--Select Per Unit Type--</option>
                {['sqft', 'box', 'pcs', 'mtr'].map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="perUnitPrice">Per Unit Price</label>
              <input
                type="number"
                id="perUnitPrice"
                {...register('perUnitPrice', {
                  required: 'Per Unit Price is required',
                  min: 0,
                })}
                className="ml-2 p-1 border"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="designStyle"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Design Style*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('designStyle', {
                      required: 'designStyle is required',
                    })}
                    id="designStyle"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Total Price
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="number"
                    {...register('totalPricePerUnit', {
                      required: 'totalPricePerUnit is required',
                      min: 1,
                      max: 10000,
                    })}
                    // onChange={(e) => setOldtotalPricePerUnit(e.target.value)}
                    id="totalPricePerUnit"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="img1"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image1*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('img1', {
                      required: 'name is required',
                    })}
                    id="img1"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="img2"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image2*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('img2', {
                      required: 'name is required',
                    })}
                    id="img2"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="img3"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image3*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('img3', {
                      required: 'name is required',
                    })}
                    id="img3"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="img4"
                className="block text-sm font-medium leading-6 text-gray-900 font-bold"
              >
                Image4*
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-orange-600 ">
                  <input
                    type="text"
                    {...register('img4', {
                      required: 'name is required',
                    })}
                    id="img4"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24 flex items-center justify-center md:justify-end gap-x-6 mr-10">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>


        <Button
          type="submit"
          // className="rounded-md shadow-2xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
          className='bg-orange-600'
        >
          Add product
        </Button>
      </div>

      {/* ---------------------------- delete model ----------------------------- */}
      {/* <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            Your Attention is Required!
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid place-items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-16 w-16 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
          <Typography color="red" variant="paragraph">
            Are you sure! You want to delete this product?
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="blue-gray" onClick={handleOpen}>
            close
          </Button>
          <Button variant="gradient" color='red' onClick={handleDelete}>
            Yes! Sure
          </Button>
        </DialogFooter>
      </Dialog> */}


    </form>
  );
}

export default ProductForm;