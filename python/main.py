import pandas as pd
from utils.ranker import load_all_resumes, rank_resumes, extract_matched_skills

# Load resumes
filenames, resumes = load_all_resumes("resumes")

# Load job description from file
with open("job_descriptions/junior_fullstack.txt", "r", encoding="utf-8") as f:
    job_description = f.read()

# Define required skills manually or extract from JD
required_skills = [
    "Python", "JavaScript", "SQL", "Flask", "FastAPI", "React", "PostgreSQL",
    "Docker", "Git", "TravisCI", "Celery", "Redis", "Material-UI"
]

# Rank resumes
scores = rank_resumes(resumes, job_description)

# Build ranking with matched skills
ranked_results = []
for i in range(len(filenames)):
    matched_skills = extract_matched_skills(resumes[i], required_skills)
    ranked_results.append((filenames[i], round(scores[i] * 100, 2), ", ".join(matched_skills)))

# ✅ Sort by match score (descending)
ranked_results.sort(key=lambda x: x[1], reverse=True)

# Show in terminal
print("\n🏆 Ranked Resumes with Matched Skills:")
for name, score, skills in ranked_results:
    print(f"{name} → {score}% match | Skills: {skills}")

# Save to CSV
df = pd.DataFrame(ranked_results, columns=["Resume", "Match Score", "Matched Skills"])
df.to_csv("data/ranking_results.csv", index=False)
print("\n✅ Results with skill matching saved to: data/ranking_results.csv")
