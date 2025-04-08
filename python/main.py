import sys
import json
import os
import pandas as pd
from utils.ranker import load_all_resumes, rank_resumes, extract_matched_skills

def main(jd_file_path, resume_dir):
    # ✅ Validate input paths
    if not os.path.exists(jd_file_path):
        print(json.dumps({"error": f"Job description file not found: {jd_file_path}"}))
        return

    if not os.path.exists(resume_dir):
        print(json.dumps({"error": f"Resume directory not found: {resume_dir}"}))
        return

    # ✅ Read the job description
    with open(jd_file_path, 'r', encoding='utf-8') as file:
        job_description = file.read().strip()

    if not job_description:
        print(json.dumps({"error": "Job description is empty."}))
        return

    # ✅ Load and parse resumes
    filenames, resumes = load_all_resumes(resume_dir)

    if not resumes:
        print(json.dumps({"error": "No valid resumes found in the uploads directory."}))
        return

    # ✅ Define required skills (could be dynamic later)
    required_skills = [
        "Python", "JavaScript", "SQL", "Flask", "FastAPI", "React", "PostgreSQL",
        "Docker", "Git", "TravisCI", "Celery", "Redis", "Material-UI"
    ]

    try:
        # ✅ Generate relevance scores
        scores = rank_resumes(resumes, job_description)

        # ✅ Build and sort ranked results
        ranked_results = []
        for i in range(len(filenames)):
            matched_skills = extract_matched_skills(resumes[i], required_skills)
            ranked_results.append({
                "filename": filenames[i],
                "score": round(scores[i] * 100, 2),
                "matched_skills": matched_skills
            })

        ranked_results.sort(key=lambda x: x["score"], reverse=True)

        # ✅ Output to Node.js
        print(json.dumps(ranked_results))

    except Exception as e:
        print(json.dumps({"error": f"Processing failed: {str(e)}"}))

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Insufficient arguments. Requires: <job_description_path> <resume_dir>"}))
    else:
        jd_file_path = sys.argv[1]
        resume_dir = sys.argv[2]
        main(jd_file_path, resume_dir)
