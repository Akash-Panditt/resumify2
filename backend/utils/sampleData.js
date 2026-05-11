const sampleData = {
  Doctor: {
    personalDetails: {
      fullName: "Dr. Sarah Mitchell",
      jobTitle: "Senior Resident Physician",
      email: "sarah.m@example.com",
      phone: "+1 (555) 012-3456",
      address: "Rochester, MN",
      summary: "Board-certified physician with 8+ years of experience in internal medicine and clinical research. Committed to providing patient-centered care and implementing evidence-based medical practices."
    },
    experience: [
      {
        jobTitle: "Senior Resident",
        company: "Mayo Clinic",
        startDate: "2020-07",
        endDate: "Present",
        description: "Leading a team of 5 residents in the internal medicine department. Managed complex inpatient cases and participated in weekly clinical research reviews."
      },
      {
        jobTitle: "Medical Intern",
        company: "Johns Hopkins Hospital",
        startDate: "2018-06",
        endDate: "2020-06",
        description: "Rotated through multiple specialties including Cardiology, Oncology, and Emergency Medicine. Provided direct patient care under senior supervision."
      }
    ],
    education: [
      {
        degree: "Doctor of Medicine (MD)",
        school: "Harvard Medical School",
        startDate: "2014-09",
        endDate: "2018-05",
        description: "Specialized in Internal Medicine. Recipient of the Academic Excellence Award."
      }
    ],
    skills: [
      { name: "Clinical Diagnosis", level: "Expert" },
      { name: "Patient Care", level: "Expert" },
      { name: "Electronic Health Records (EHR)", level: "Advanced" }
    ],
    languages: [{ name: "English", level: 5 }, { name: "Spanish", level: 3 }]
  },
  Teacher: {
    personalDetails: {
      fullName: "James Wilson",
      jobTitle: "Senior Mathematics Teacher",
      email: "j.wilson@school.edu",
      phone: "+1 (555) 987-6543",
      address: "Austin, TX",
      summary: "Dedicated educator with over 10 years of experience in secondary education. Proven track record of improving student engagement and standardized test scores through innovative curriculum design."
    },
    experience: [
      {
        jobTitle: "Head of Mathematics Department",
        company: "Westview High School",
        startDate: "2019-08",
        endDate: "Present",
        description: "Overseeing curriculum development for grades 9-12. Implementing project-based learning initiatives that increased student math proficiency by 15%."
      },
      {
        jobTitle: "Mathematics Teacher",
        company: "Eastside Academy",
        startDate: "2014-08",
        endDate: "2019-06",
        description: "Taught Algebra II, Geometry, and AP Calculus. Mentored the school's award-winning Math Olympiad team."
      }
    ],
    education: [
      {
        degree: "M.Ed. in Curriculum and Instruction",
        school: "University of Texas at Austin",
        startDate: "2012-09",
        endDate: "2014-05",
        description: "Focused on STEM education and digital learning tools."
      }
    ],
    skills: [
      { name: "Curriculum Development", level: "Expert" },
      { name: "Classroom Management", level: "Expert" },
      { name: "Educational Technology", level: "Advanced" }
    ],
    languages: [{ name: "English", level: 5 }]
  },
  Lawyer: {
    personalDetails: {
      fullName: "Elena Rodriguez",
      jobTitle: "Corporate Legal Counsel",
      email: "e.rodriguez@lawfirm.com",
      phone: "+1 (555) 234-5678",
      address: "Chicago, IL",
      summary: "Dynamic attorney specializing in corporate law, mergers & acquisitions, and intellectual property. Expert at navigating complex legal frameworks and negotiating high-stakes contracts."
    },
    experience: [
      {
        jobTitle: "Senior Associate",
        company: "Smith & Harrison LLP",
        startDate: "2020-01",
        endDate: "Present",
        description: "Representing Fortune 500 companies in multi-million dollar cross-border transactions. Drafting and reviewing complex commercial agreements."
      },
      {
        jobTitle: "Junior Counsel",
        company: "Global Tech Solutions",
        startDate: "2017-09",
        endDate: "2019-12",
        description: "Managed the company's IP portfolio and handled internal employment law matters. Reduced legal external spend by 20% through efficient in-house processing."
      }
    ],
    education: [
      {
        degree: "Juris Doctor (JD)",
        school: "Yale Law School",
        startDate: "2014-09",
        endDate: "2017-05",
        description: "Editor of the Yale Law Journal. Focused on Corporate Governance."
      }
    ],
    skills: [
      { name: "Contract Negotiation", level: "Expert" },
      { name: "Legal Research & Writing", level: "Expert" },
      { name: "Corporate Litigation", level: "Advanced" }
    ],
    languages: [{ name: "English", level: 5 }, { name: "Spanish", level: 5 }]
  },
  General: {
    personalDetails: {
      fullName: "Alex Johnson",
      jobTitle: "Software Engineer",
      email: "alex.j@example.com",
      phone: "+1 (555) 000-0000",
      address: "San Francisco, CA",
      summary: "Full-stack developer with a passion for building scalable web applications. Expert in React, Node.js, and cloud architecture."
    },
    experience: [
      {
        jobTitle: "Senior Full Stack Developer",
        company: "InnovateTech",
        startDate: "2021-03",
        endDate: "Present",
        description: "Leading the development of a microservices-based e-commerce platform. Optimized database queries resulting in a 40% reduction in API latency."
      },
      {
        jobTitle: "Web Developer",
        company: "StartUp Inc",
        startDate: "2019-06",
        endDate: "2021-02",
        description: "Developed and maintained several client-facing websites using React and Redux. Collaborated with designers to implement pixel-perfect UI components."
      }
    ],
    education: [
      {
        degree: "B.S. in Computer Science",
        school: "Stanford University",
        startDate: "2015-09",
        endDate: "2019-05",
        description: "Specialized in Artificial Intelligence and Web Technologies."
      }
    ],
    skills: [
      { name: "React / Next.js", level: "Expert" },
      { name: "Node.js / Express", level: "Expert" },
      { name: "PostgreSQL / MongoDB", level: "Advanced" }
    ],
    languages: [{ name: "English", level: 5 }]
  }
};

const getSampleDataByPreview = (category) => {
  return sampleData[category] || sampleData.General;
};

module.exports = { getSampleDataByPreview };
