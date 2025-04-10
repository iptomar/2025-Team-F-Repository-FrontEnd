
//CursoAPI
const API_BASE_URL_Curso = 'http://localhost:5281/api/CursoAPI';

export const fetchCursos = async () => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(API_BASE_URL_Curso, requestOptions);
    console.log('Fetch response:', response);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Fetch cursos failed:', response.status, errorBody);
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('fetchCursos response:', data);
    return data;
  } catch (error) {
    console.error('Fetch cursos failed:', error);
    throw error;
  }
};

export const fetchCursoDetails = async (id) => {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${API_BASE_URL_Curso}/${id}`, requestOptions);
    console.log('Fetch response:', response);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Fetch curso details failed:', response.status, errorBody);
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('fetchCursoDetails response:', data);
    return data;
  } catch (error) {
    console.error('Fetch curso details failed:', error);
    throw error;
  }
};

export const createCurso = async (curso) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(curso),
    redirect: 'follow',
  };

  try {
    const response = await fetch(API_BASE_URL_Curso, requestOptions);
    console.log('Fetch response:', response);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Create curso failed:', response.status, errorBody);
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('createCurso response:', data);
    return data;
  } catch (error) {
    console.error('Create curso failed:', error);
    throw error;
  }
};


export const updateCurso = async (id, curso) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: JSON.stringify(curso),
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${API_BASE_URL_Curso}/${id}`, requestOptions);
    console.log('Fetch response:', response);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Update curso failed:', response.status, errorBody);
      throw new Error('Network response was not ok');
    }
    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : {};
    console.log('updateCurso response:', data);
    return data;
  } catch (error) {
    console.error('Update curso failed:', error);
    throw error;
  }
};



export const deleteCurso = async (id) => {
  const requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
  };

  try {
    const response = await fetch(`${API_BASE_URL_Curso}/${id}`, requestOptions);
    console.log('Fetch response:', response);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Delete curso failed:', response.status, errorBody);
      throw new Error('Network response was not ok');
    }
    console.log('deleteCurso response:', response);
    return response;
  } catch (error) {
    console.error('Delete curso failed:', error);
    throw error;
  }
};

