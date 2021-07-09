import axios from "axios";

const URL="http://localhost:3000/api/";
const ApiService =  {

   signup(nom, prenom, username, email, password){
    return axios
    .post(URL + "auth/signup",{ 
      nom: nom,
      prenom: prenom,
      username: username,
      email: email,
      password: password,
    })
  },

  login(username, password){
    return axios
    .post(URL + "auth/login",{ 
      username: username,
      password: password,
    })
  },
  
  getAllPost() {
    return axios
      .get(URL + "post/getAll", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
      })
      
  },

  getAllComment() {
    return axios
      .get(URL + "comment/getAll", {
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  getAllUsers() {
    return axios
      .get(URL + "auth/users", {
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  getOnePost(post) {
    return axios
      .get(URL + `auth/post/${post.post_id}`, {
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  getOneUser(userId) {
    return axios
      .get(URL + `auth/user/${userId}`, {
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  deleteUser(id) {
    return axios 
      .delete(URL + `auth/user/${id}`,{
             headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
      })
  },

  createPost(formData) {
    return axios 
    .post(URL + "post/create", formData,
    {
            headers: {
              'Authorization': "Bearer " + localStorage.getItem("token"),
              'Content-Type': 'multipart/form-data'
                }
    })
  },

  removePost(post) {
    console.log(post);

    return axios 
    .delete(URL + `post/${post.post_id}`,
    {
            headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
    })
  },

  createComment(message, postId) {
  return axios 
    .post(URL + "comment/create",{ 
      message: message,
      post_id: postId,
      user_id: localStorage.getItem('userId'),
    },
    {
            headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
    })
  },

   removeComment(comment) {
    console.log(comment);

    return axios 
    .delete(URL + `comment/${comment.id}`,
    {
            headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
    })
  },
  
}

export default ApiService