import re
import spacy
from PyPDF2 import PdfFileReader
from docx import Document


nlp = spacy.load("en_core_web_sm")

# Function to extract text from pdf
def extract_text_from_pdf(file_path):
    with open(file_path, "rb") as file:
        reader = PdfFileReader(file)
        text = ""
        for page_num in range(reader.getNumPages()):
            text += reader.getPage(page_num).extractText()
    return text

# Function to extract text from docx
def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

# Function to extract information from text
def extract_information(text):
    doc = nlp(text)
    skills = []
    experience = []
    education = []
    for sent in doc.sents:
        sent_text = sent.text.lower()
        
        if any(skill in sent_text for skill in ["python", "java", "project management", "agile"]):
            skills.append(sent.text)
        
        if any(word in sent_text for word in ["worked", "managed", "led", "developed"]):
            experience.append(sent.text)
       
        if any(word in sent_text for word in ["bachelor", "master", "phd", "university", "college"]):
            education.append(sent.text)
    return skills, experience, education


def generate_competence_profile(skills, experience, education):
    profile = {
        "Technical Skills": skills,
        "Work Experience": experience,
        "Education": education
    }
    return profile

def process_resume(file_path):
    if file_path.endswith(".pdf"):
        text = extract_text_from_pdf(file_path)
    elif file_path.endswith(".docx"):
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file format")
    
    skills, experience, education = extract_information(text)
    profile = generate_competence_profile(skills, experience, education)
    return profile


file_path = "M.Ravan CV.docx" 
profile = process_resume(file_path)
print(profile)
print(type(profile))
