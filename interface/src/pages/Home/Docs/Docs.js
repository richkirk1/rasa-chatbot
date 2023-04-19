import DocsContainer from "../../../components/doccontainer/DocContainer";

import "./Docs.css"

const ConfigSection = () => {
    return (
      <div className="docs-section">
        <div className="docs-container">
            <DocsContainer
              title="Introduction"
            >
              <p>
                Resume Rover is an interactive chatbot application designed to guide users through the job search process. 
                Resume Rover uses conversational AI powered by Rasa to provide personalized job recommendations. 
                We seek to personalize the job search process, making it easier for users to find relevant job postings and prepare for interviews. 
                Our chatbot engine uses Python as a backend and React to build an interactive user experience. Meilisearch serves as our 
                document database and RESTful search engine for job postings. 
                In this project, we will take you through the development process and show the key features and functionalities of Resume Rover.
              </p>
            </DocsContainer>
  
            <DocsContainer title="How does it work?">
              <p>
              The user can choose to upload the resume anytime during the conversation, the description part of the resume will be saved in a temporary database.
               After the user specifies the job title and the location, All the matching jobs will be stored as a list. 
              The experience part of the resume will then be compared to the job description field of each job, and the jobs will be ordered 
              in the order of the similarity scores in the carousel.
              </p>
            </DocsContainer>
            <DocsContainer title="References">
              <ul>
              <li> <a href="https://gist.github.com/FredrikOseberg/87795296efb67fe76fa05fc839d22e25"> react-chatbot-kit</a>
              </li>
              
              <li> <a href="https://github.com/meilisearch/meilisearch"> meilisearch</a>
              </li>
     
              <li> <a href=" https://github.com/RasaHQ/rasa"> rasa</a>
              </li>

              </ul>
            </DocsContainer>
    
        </div>
      </div>
    );
  };
  
  export default ConfigSection;