export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

export const genders = ["Male", "Female", "Other"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));

export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));

export const slides = [
  {
    url: "https://cdn.pixabay.com/photo/2013/07/13/11/54/chopper-158940_1280.png",
    title: "car-1",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/03/31/22/47/motorbike-1297212_1280.png",
    title: "car-2",
  },
  {
    url: "https://cdn.pixabay.com/photo/2017/01/31/15/22/art-2025018_1280.png",
    title: "car-3",
  },
  {
    url: "https://cdn.pixabay.com/photo/2017/01/31/23/29/motocross-2028195_1280.png",
    title: "car-4",
  },
  {
    url: "https://cdn.pixabay.com/photo/2016/03/31/22/48/motorbike-1297222_1280.png",
    title: "car-5",
  },
];
