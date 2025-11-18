import HttpCliennt from "../services/Service"

// handle contact info api 
export const handlegetallcompanies = () => {
    return HttpCliennt.get(`/compantdetails`);
}

export const handlegetsinglecompany = (id) => {
    return HttpCliennt.get(`/compantdetails/${id}`);
}


export const searchingnames = (params) => {
    return HttpCliennt.get(`/compantdetails/companydetails/search`, params);
}