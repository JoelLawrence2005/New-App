# Sign Sri

## Description
This the Sign Sri's main repository

## Project Structure
```
root/
├── frontend/
│   ├── node_modules/
│   ├── Context
|   ├── assets
|   ├── config
|   ├── screens 
│   ├── App.js
│   ├── package.json
│   └── ...
├── backend/
│   ├── node_modules/
│   ├── ASLimages
|   ├── config
|   ├── outputs
│   ├── routes
│   ├── package.json
│   ├── python/
│   │   ├── venv/
│   │   ├── src/
│   │   ├── requirements.txt
│   │   └── ...
│   └── ...
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (use `nvm` to manage versions)
- Python 3.x

### Installation

#### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

#### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

#### Python
1. Navigate to the `backend/python` directory:
   ```bash
   cd backend/python
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `.\venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Project

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Start the React Native development server:
   ```bash
   npm start
   ```

### Backend
1. Navigate to the `backend/python` directory:
   ```bash
   cd backend/python
   ```
2. Run the below script:
   ```bash
   venv\Scripts\activate
   ```
3. Install the `requirements.txt`:
   ```bash
   pip install -r requirements.txt
   ```
4. Navigate to the `backend/python` directory:
   ```bash
   cd ..
   ```
5. Run the below script
   ```bash
   node TestToSign.js
   ```
## Node.js Version Management
To ensure consistency across team members, use `nvm` to manage Node.js versions:

1. Install Node.js version 22.12.0:
   ```bash
   nvm install 22.12.0
   ```

2. Use Node.js version 22.12.0:
   ```bash
   nvm use 22.12.0
   ```

3. Set Node.js version 22.12.0 as the default:
   ```bash
   nvm alias default 22.12.0
   ```

4. Add `.nvmrc` file to specify the Node.js version:
   ```bash
   echo "22.12.0" > .nvmrc
   ```

5. Commit the `.nvmrc` file:
   ```bash
   git add .nvmrc
   git commit -m "Add .nvmrc file for Node.js version management"
   git push origin main
   ```

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
```

Feel free to adjust the `README.md` file to better fit your project's specifics. Let me know if you need any further assistance!
