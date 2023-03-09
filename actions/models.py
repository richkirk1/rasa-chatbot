from sqlalchemy import Column, Float, ForeignKey, String, Table, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

engine = create_engine('sqlite:///job_postings.db')
Base = declarative_base()

# Define the job_postings table
class JobPosting(Base):
    __tablename__ = 'job_postings'

    _id = Column(String, primary_key=True)
    title = Column(String)
    description = Column(String)
    posted_at = Column(String)
    url = Column(String)
    salary = Column(Float)
    experience = Column(String)
    education = Column(String)
    company = Column(String)
    locality = Column(String)
    region = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    postalCode = Column(String)
    employment_type = Column(String)

    skills_rel = relationship('Skill', secondary='job_posting_skills', back_populates='job_postings_rel')

# Define the skills table
class Skill(Base):
    __tablename__ = 'skills'

    skill = Column(String, primary_key=True)

    job_postings_rel = relationship('JobPosting', secondary='job_posting_skills', back_populates='skills_rel')

# Define the job_posting_skills table
job_posting_skills = Table('job_posting_skills', Base.metadata,
    Column('_id', String, ForeignKey('job_postings._id'), primary_key=True),
    Column('skill', String, ForeignKey('skills.skill'), primary_key=True)
)

Base.metadata.create_all(engine)