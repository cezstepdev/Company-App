import axios from "axios";

export class ProductService {
    getProducts() {
        let tasks;

        const config = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };

        axios.get('http://localhost:8080/api/v1/task/all', config).then(
            res => {
                console.log("some res data: " + JSON.stringify(res));
                tasks = res.data;
            }
        );

        return tasks;
    }
}