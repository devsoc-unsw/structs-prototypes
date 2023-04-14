

function Roadmap() {
// Import all files and get an array of file names
const edu_pages = import.meta.glob('./edu_pages/*.mdx');
const edu_FileNames = Object.keys(edu_pages);


edu_FileNames.forEach((fileName) => {
  console.log(fileName);
});

return (<div>
    <h1>hi from roadmap.tsx!</h1>
</div>)


}

export default Roadmap;