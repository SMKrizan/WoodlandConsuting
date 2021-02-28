import React, {useState} from 'react';
import { useQuery} from '@apollo/react-hooks';
import { GET_PROJECTS} from '../../utils/queries';
import './CategoryList.css'

function CategoryList() {
    const { loading, data} = useQuery(GET_PROJECTS);
    const projectData = data?.projects ;

    if (loading) {
      return <div>Loading...</div>;
    }
    if (!projectData) {
        return <h2>LOADING...</h2>;
      }
    //libraries
    const libraries = projectData.filter((project) => project.category.categoryName == 'Libraries/Schools');
    const isolatedL = libraries.map((project) => project.company)
     let cleanedLibraries = [...new Set(isolatedL)]

    //commercial
    const commercial = projectData.filter((project) => project.category.categoryName == 'Commercial/Office');
    const isolatedC = commercial.map((project) => project.company)
    let cleanedComercial = [...new Set(isolatedC)]
    //retail
    const retail = projectData.filter((project) => project.category.categoryName == 'Retail/Restaurant');
    const isolatedR = retail.map((project) => project.company)
    let cleanedRetail = [...new Set(isolatedR)]
    //industrial
    const industrial = projectData.filter((project) => project.category.categoryName == 'Industrial/Transport Hubs');
    const isolatedI = industrial.map((project) => project.company)
    let cleanedIndustial = [...new Set(isolatedI)]

    return (
        <div className="">
            <br></br>
            <div className="flex1">
                <h4 className="padt">Libraries/Schools</h4>
                <h5>
                {cleanedLibraries.map(project => 
                        <a key={project}>
                         - {project} &nbsp;
                        </a>
                )}
            </h5>
            </div>
            <br></br>
            <div className="flex1">
                <h4 className="padt">Commercial/Office</h4>
                <h5>
                        {cleanedComercial.map(project => 
                            <a key={project}>
                            - {project} &nbsp;
                            </a>
                        )}
                </h5>
            </div>
            <br></br>
            <div className="flex1">
                <h4 className="padt">Retail/Restaurant</h4>
                <h5>
                        {cleanedRetail.map(project => 
                            <a key={project}>
                            - {project} &nbsp;
                            </a>
                        )}
                </h5>
            </div>
            <br></br>
            <div className="flex1">
                <h4 className="padt">Industrial/Transport Hubs</h4>
                <h5>
                        {cleanedIndustial.map(project => 
                            <a key={project}>
                            - {project} &nbsp;
                            </a>
                        )}
                </h5>
            </div>
        </div>
    )
}

export default CategoryList;