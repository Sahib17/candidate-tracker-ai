import os
import fitz  # PyMuPDF
import docx
import re

def extract_text_from_pdf(file_path):
    text = ""
    try:
        with fitz.open(file_path) as doc:
            for page in doc:
                text += page.get_text()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return text

def extract_text_from_docx(file_path):
    text = ""
    try:
        doc = docx.Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    return text

def parse_resume(file_path):
    ext = os.path.splitext(file_path)[-1].lower()
    if ext == ".pdf":
        return extract_text_from_pdf(file_path)
    elif ext == ".docx":
        return extract_text_from_docx(file_path)
    else:
        print(f"Unsupported file type: {file_path}")
        return ""

def extract_basic_info(text):
    email = re.search(r'[\w\.-]+@[\w\.-]+', text)
    phone = re.search(r'\+?\d[\d\s()-]{8,}\d', text)
    return {
        "email": email.group() if email else "Not found",
        "phone": phone.group() if phone else "Not found"
    }
