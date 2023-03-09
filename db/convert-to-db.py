import json
import sqlite3

conn = sqlite3.connect('job_postings.db')
cursor = conn.cursor()

cursor.execute('''
    CREATE TABLE IF NOT EXISTS job_postings (
        _id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        posted_at TEXT,
        url TEXT,
        salary REAL,
        experience TEXT,
        education TEXT,
        company TEXT,
        locality TEXT,
        region TEXT,
        latitude REAL,
        longitude REAL,
        postalCode TEXT,
        employment_type TEXT
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS skills (
        skill TEXT PRIMARY KEY
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS job_posting_skills (
        _id TEXT,
        skill TEXT,
        FOREIGN KEY (_id) REFERENCES job_postings (_id),
        FOREIGN KEY (skill) REFERENCES skills (skill),
        PRIMARY KEY (_id, skill)
    )
''')

with open('jobs.json') as f:
    data = json.load(f)

for job in data:
    salary = job['salary']
    if not salary or salary[0] != '$':
        salary = 0.0
    else:
        salary = salary.split(' - ')[-1].split('/')[0].strip()[1:].replace(',','')

    cursor.execute('''
        INSERT OR IGNORE INTO job_postings VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        job['_id'],
        job['title'],
        job['description'],
        job['posted_at'],
        job['url'],
        salary,
        job['experience'],
        job['education'],
        job['company'],
        job['locality'],
        job['region'],
        job['latitude'],
        job['longitude'],
        job['postalCode'],
        job['employment_type']
    ))

    for skill in job['skills'].split(', '):
        cursor.execute('''
            INSERT OR IGNORE INTO skills (skill)
            VALUES (?)
        ''', (skill,))
        
        cursor.execute('''
            INSERT OR IGNORE INTO job_posting_skills (_id, skill)
            VALUES (?, ?)
        ''', (
            job['_id'],
            skill
        ))

conn.commit()
conn.close()