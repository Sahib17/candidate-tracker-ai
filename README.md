
# 📊 HireIQ – An AI-Powered Candidate Tracking System

HireIQ is an intelligent Applicant Tracking System (ATS) that streamlines recruitment by leveraging AI to analyze resumes against job descriptions. It provides a user-friendly interface for uploading job descriptions and resumes, processes them using a Python-based AI script, and presents ranked candidates based on relevance.

---

## 🚀 Features

- **AI-Driven Resume Analysis**: Utilizes a Python script to evaluate and rank resumes based on their similarity to the provided job description.
- **Bulk Resume Upload**: Supports uploading up to 10 resumes for efficient and fast processing.
- **Dynamic Results Display**: Presents analysis results in an interactive and visually appealing format.
- **CSV Export**: Allows downloading analysis results in CSV format for record-keeping or further analysis.
- **Modern UI**: Built with Tailwind CSS to ensure a responsive and clean user interface.

---

## 🛠️ Tech Stack

- **Frontend**: EJS Templates, Tailwind CSS
- **Backend**: Node.js, Express.js
- **AI Processing**: Python (for resume analysis)
- **Database**: MongoDB
- **File Uploads**: Multer

---

## 📂 Project Structure

```
candidate-tracker-ai/
├── Controllers/          # Route controllers
├── Routes/               # Express route definitions
├── db/                   # Database connection and models
├── images/               # Static images
├── models/               # Mongoose models
├── node_modules/         # Node.js dependencies
├── python/               # Python scripts for AI processing
├── temp/                 # Temporary files
├── uploads/              # Uploaded resumes
├── utils/                # Utility functions
├── views/                # EJS templates
├── .env                  # Environment variables
├── .gitignore            # Git ignore file
├── app.js                # Main application file
├── package.json          # Node.js project metadata
├── requirements.txt      # Python dependencies
└── README.md             # Project documentation
```

---

## ⚙️ Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Sahib17/candidate-tracker-ai.git
   cd candidate-tracker-ai
   ```

2. **Install Node.js Dependencies**

   ```bash
   npm install
   ```

3. **Install Python Dependencies**

   Ensure you have Python installed, then:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**

   Create a `.env` file in the root directory and add:

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```
   ```env
   JWT_SECRET=your_Secret_Key
   ```


5. **Start the Application**

   ```bash
   npm start
   ```

6. **Access the Application**

   Open your browser and navigate to:

   ```
   http://localhost:8080
   ```

---

## 📈 Usage

1. **Upload Job Description and Resumes**
   - Navigate to the upload page.
   - Enter the job description.
   - Upload one or multiple resumes in PDF format.

2. **Process Resumes**
   - Click on the 'Analyze' button.
   - The system will process the resumes and display a ranked list based on relevance.

3. **Download Results**
   - Click on the 'Download CSV' button to export the analysis results.


