import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from utils.resume_parser import parse_resume

def load_all_resumes(resume_folder):
    resumes = []
    filenames = []

    for file in os.listdir(resume_folder):
        if file.endswith((".pdf", ".docx")):
            path = os.path.join(resume_folder, file)
            text = parse_resume(path)
            resumes.append(text)
            filenames.append(file)
    
    return filenames, resumes

def rank_resumes(resumes, job_description):
    vectorizer = TfidfVectorizer(stop_words='english')
    docs = resumes + [job_description]
    tfidf_matrix = vectorizer.fit_transform(docs)

    scores = cosine_similarity(tfidf_matrix[:-1], tfidf_matrix[-1:])
    scores = scores.flatten()

    return scores

def extract_matched_skills(resume_text, required_skills):
    resume_text_lower = resume_text.lower()
    matched = [skill for skill in required_skills if skill.lower() in resume_text_lower]
    return matched
