import Part from "./Part";
import Header from "./Header";
import Total from "./Total";
const Content = ({course}) =>{

    return (
        <div>
           <Header course = {course.name} />
           {course.parts.map(part => 
                <Part part = {part} key={part.id}/>
            )}
              <Total parts = {course.parts} />
        </div>
    )
}

export default Content;