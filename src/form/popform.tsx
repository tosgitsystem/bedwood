import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// Define the type for the form data
interface PopUpFormData {
  name: string;          // Required
  mobileNo: string;      // Required
  address: string;       // Required
  email?: string;        // Optional
}

// Define the validation schema using Yup
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  mobileNo: Yup.string().required('Mobile number is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email format').optional(),
});

export const PopUpForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<PopUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PopUpFormData) => {
    // Construct WhatsApp message
    const message = `Name: ${data.name}\nMobile No: ${data.mobileNo}\nAddress: ${data.address}${data.email ? `\nEmail: ${data.email}` : ''}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${"+919675111719"}?text=${encodedMessage}`; // Replace with the desired number

    // Open WhatsApp with the message
    window.open(whatsappUrl, '_blank');
    
    onClose(); // Close the popup after submission (optional)
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white flex rounded shadow-md relative m-6" style={{ width: '90%', maxWidth: '800px', height: 'auto', minHeight: '200px' }}>
        {/* Image on the left */}
        <div className="md:block hidden w-1/2">
          <img
            src="/popup.png"
            alt="Descriptive Alt Text"
            className="w-full h-full object-contain rounded-l"
          />
        </div>

        {/* Form on the right */}
        <div className="w-full md:w-1/2 p-4 overflow-hidden flex flex-col">
          {/* Close icon in the top right corner */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-900" // Changed to gray-500
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <h2 className="text-lg font-bold mb-4 text-center">Welcome To Bedwood Furnitures</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex mb-2 space-x-2">
              <div className="flex-1">
                <label className="block mb-1 text-sm">
                  Name:
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input {...field} className="border-2 border-gray-300 rounded-md w-full p-1 text-sm" />
                    )}
                  />
                </label>
                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-sm">
                  Mobile No:
                  <Controller
                    name="mobileNo"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <input {...field} className="border-2 border-gray-300 rounded-md w-full p-1 text-sm" />
                    )}
                  />
                </label>
                {errors.mobileNo && <p className="text-red-500 text-xs">{errors.mobileNo.message}</p>}
              </div>
            </div>

            <div className="mb-2">
              <label className="block mb-1 text-sm">
                Email (optional):
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input {...field} type="email" className="border-2 border-gray-300 rounded-md w-full p-1 text-sm" />
                  )}
                />
              </label>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            <div className="mb-2">
              <label className="block mb-1 text-sm">
                Address:
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <textarea {...field} className="border-2 border-gray-300 rounded-md w-full p-1 text-sm h-24" />
                  )}
                />
              </label>
              {errors.address && <p className="text-red-500 text-xs">{errors.address.message}</p>}
            </div>

            <div className=" mt-4">
              <button type="submit" className="bg-blue-500 text-sm text-white rounded px-4 py-2">Submit</button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
