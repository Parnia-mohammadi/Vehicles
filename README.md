#🚀 Vehicle Tracking System
Welcome to the Vehicle Tracking System, a modern solution for efficiently tracking and managing vehicles. This project provides an interactive and visual experience, utilizing maps and dynamic data visualization to help users filter data and find specific vehicles.
This project has two branches:
1️⃣ The master branch uses React Query (TanStack) for efficient caching, reducing unnecessary requests to the server.
2️⃣ The other branch leverages Context API for caching data in localStorage, displaying only 50 vehicles per page.
🔍 Filtering & Searching

- In the master branch, users can search and filter data inside a modal, with form handling via React Hook Form and validation using Yup Resolver.
- Both branches include theme toggling and navigation powered by React Router DOM.
  🗺 Map Visualization
  This system supports two methods for displaying markers on the map:
  1️⃣ Marker Clustering: Groups nearby vehicles to improve performance.
  2️⃣ Standard Markers: Displays all vehicles while limiting the zoom level for better readability.
  Users can select a vehicle by clicking on the markers in the map or choosing from the list. When a vehicle is selected:
- A detailed table of the vehicle appears.
- The map zooms and centers on the selected vehicle's location.
- In the master branch, selecting a vehicle updates the pagination when navigating back to the vehicle list, ensuring the selected vehicle remains visible.

##✨ Features

- 🚗 **Vehicle List Pagination** – Browse through a structured table with smooth pagination.
- 🗺 **Interactive Map Integration** – Clicking on a vehicle focuses the map on its location, displaying relevant data. Returning to the vehicle list highlights the previously selected vehicle.
- 🔍 **Data Persistence & Error Handling** – Efficient caching reduces redundant API calls. React-Query and Local storage enhance performance. Errors are managed via react-hot-toast, with unit tests available in the tests folder.
- ⚡ **Minimal & Modern UI** – Built using **React.js**, **Tailwind CSS**, **React Router DOM**, **JSON Server**, **React-Query**, **React-Hook-Form** and **Leaflet.js**.

📦 Installation
Clone the repository and install dependencies:
git clone https://github.com/Parnia-mohammadi/Vehicles
cd Vehicles
npm install
npm run dev
