# Video Web App

This project is a simple web application that allows users to view and upload videos. The application is built using Node.js and Express, and it serves videos stored in a designated folder on the host.

## Features

- View a list of available videos.
- Play videos in full-screen mode.
- Upload new videos to the server.

## Project Structure

```
video-web-app
├── public
│   ├── index.html        # Main HTML document for the website
│   └── styles.css       # Styles for the website
├── src
│   ├── server.js        # Entry point of the application
│   ├── routes
│   │   ├── videos.js    # Handles video listing requests
│   │   └── upload.js    # Handles video upload requests
│   └── views
│       └── homepage.ejs  # Template for rendering the homepage
├── videos                # Folder for storing uploaded video files
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd video-web-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Open your web browser and go to `http://localhost:3000` to view the application.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements for the project.