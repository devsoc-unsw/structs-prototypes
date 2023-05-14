import { Link } from 'react-router-dom';

function Roadmap() {

  // Import all files and get an array of file names
  const edu_pages = import.meta.glob('./edu_pages/*.mdx');
  const edu_FileNames = Object.keys(edu_pages);

  //creates links to all edu/quiz files.
  const fileNameLinks = edu_FileNames.map((fileName) => {
    
    //clean up path names
    fileName = fileName.replace('/edu_pages', '').replace('.mdx', '').replace('./', '');
    let fileNamePath = '/'.concat(fileName);
    let fileNameQuizPath = '/'.concat(fileName) + "Quiz";

    return (
      <div key={fileName}>
       {fileName + ': '} <Link to={fileNamePath}>education link</Link>
       {' - '}<Link to={fileNameQuizPath}>quiz link</Link>
      </div>
    );
  });

  return (
    <div>
      <h2>list of all education pages and corresponding quiz pages:</h2>
      {fileNameLinks}
    </div>
  );
}

export default Roadmap;