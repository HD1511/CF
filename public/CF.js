document.getElementById("button").addEventListener("click", loader);
function loader() {
    var xhr = new XMLHttpRequest();
    const username=document.getElementById("username").value;
    const rating1=document.getElementById("rating1").value;
    const rating2=document.getElementById("rating2").value;
    const url = `https://codeforces.com/api/user.status?handle=${username}&from=1&count=100000`;
    xhr.open("GET",url, true);
    xhr.onload = function () {
        if (this.status == 200) {
            var user = JSON.parse(this.responseText);
            console.log(user);
            var output="";
            const dataOfUser=[];
            for(let i=0;i<user.result.length;i++){
               if(user.result[i].problem.rating>=Number(rating1) && Number(rating2)>=user.result[i].problem.rating && user.result[i].verdict==="OK"){
                const x = [`${user.result[i].problem.rating}`,`${user.result[i].problem.name}`,`${user.result[i].problem.contestId}/problem/${user.result[i].problem.index}`]
                dataOfUser.push(x);
               }
            }
            dataOfUser.sort(function(a , b){
                if(Number(a[0]) > Number(b[0])) return 1;
                if(Number(a[0]) < Number(b[0])) return -1;
                return 0;
            });
            for(let i=0;i<dataOfUser.length;i++){
                 output+=`<tr>
                  <th scope="row">${i+1}</th>
                  <td><a href="https://codeforces.com/contest/${dataOfUser[i][2]}" target="_blank">${dataOfUser[i][1]}</a></td>
                  <td>${dataOfUser[i][0]}</td>
                </tr>`
            }
            document.getElementById("data").innerHTML=output;
        }
    }
    xhr.send();
}
