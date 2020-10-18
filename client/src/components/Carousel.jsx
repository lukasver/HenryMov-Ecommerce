import React, { useEffect,useState } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import './Carousel.css';

export default function Carousel() {

    const [randomDes, setRandomDes] = useState([]);

    useEffect(() => {
        let arrayDes = [];
        let value;
        axios.get("http://localhost:3001/products")
            .then((products) => {
                for (let i = 0; i < 4; i++) {
                    value = Math.floor(Math.random() * products.data.length);
                    arrayDes.push(products.data[value]);
                    products.data.splice(value, 1);
                }
                setRandomDes(arrayDes)
            })
            .catch((err) => new Error(err));
    }, [])

return (
    <div className="container">
        <br /><br /><br /><br /><br />
        <h3>Productos Destacados</h3>
        <br />
        <div className="main row">
            {randomDes.map(prod =>
                <div className="card-group col-md-3">
                    <ProductCard
                        key={prod.id}
                        id={prod.id}
                        name={prod.name}
                        description={prod.description}
                        price={prod.price}
                        image={prod.image}
                    />
                </div>)}
        </div>
        <br /><br /><br /><br /><br /><br />
        <h2> X-TREME SPORT </h2>
        <br />
        <div className="main row">
            <div className="col-md-6 row test-izq">
                <div className="col-md-6">
                <div class="embed-responsive embed-responsive-4by3">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/XEUzbeu2foY?start=23" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
                <div className="col-md-6">
                    <br />
                    <h5>Carla Basaul</h5>
                    <p className="perfil">Programmer</p>
                    <p className="test-text">
                        “Supe de ustedes por un amigo. Quiero actualizar y adquirir conocimientos en lenguajes que no conocía o que conocía pero por muchos años no practiqué y ya no recuerdo.
					</p>
                </div>
            </div>
            <div className="col-md-6 row test-der">
                <div className="col-md-6">
                    <img className="img-testimonio" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTExMWFhUXFxoYFxcXFxgXFxgYFRcXFhgXFRgYHSggGh0lHRUVITEhJSorLi4uFyAzODMtNygtLisBCgoKDg0OGxAQGy8lICUtLS0tLS0vLy0tKy8tLS0vLS01LS0tLS0tLS0tLS0tKy0vLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAgMEBQcAAQj/xABGEAACAQIEAwUFBQYEBQIHAAABAgMAEQQSITEFQVEGEyJhcQcygZGhFCNCscEzUmJy0fBDorLhJHOCkvEVYxY0U3SzwuL/xAAaAQACAwEBAAAAAAAAAAAAAAACBAEDBQAG/8QAMxEAAgECBQEGBQMEAwAAAAAAAAECAxEEEiExUUEFEyIyYXGBkaHR8LHB4SMzUvE0QnL/2gAMAwEAAhEDEQA/AM545OHOhFiSQPVjf0FbxwPL3Edsvui+X3b21tXzzj5PGdbi+ltreVbl7PnRsDF3a5QLgi99QTe9X4fZlNTdFR7R+1E+CaHuspDh8wYdLWPUVF4D2gmkgRizAHkTc79d6pvbYfv8MP4G/wBQpns5xRRgyWZbx6Ac/KurSknZEwS3GOO9oiMUjFTeMnNc+9enuyHH2+0TSga+E26qNCPrQbip2kcuxuSatuxTqJ2Jve2g6+tV7ahWubvgsSsqK6G4I/8AIPnT9BHZ3ifctZj90518jyYfrRwKahPMrlTVjy1eWpVcxA1NEQJtXhFMjGoTZTm9NtPOno3B2qTjy1M4rEJGuZ2Cr1OlPsbanlWM9rOOtPKWZvCPdXkF5Ejqd6Gc8qJjG7DyXtthr+FjYHxEqdrjbkap8b2/Ba0Wml9Rv89vSs5xWKaTRQQvK+mp51EF9ulU9+yzuzXeH9tV072wB55SPmRcUWYXFJIoaNgynmDf/wAV8+4fFsptrarng/EpYyTE5S41sd/UVKr8kOnwbaxtvpVdi+O4WP354x5ZgT8hWOcYxM5N3lkYHbMxPqCKqwat71dAMrNexHb3CA5ULyH+FbD5tVnwDji4nvQEZDGwU3IN7gNpb1rE8OLsLb1qXsyQ93iSdzNa/oiiujNyZzVgwIrrUu1eWq0ERavLUu1VfH+NxYRFeW+VmC6C+p61FziyUkG43ql4sl2qC/bKM/slZ/5QzfVRb609FizKgZlyMeTaW9aWr1IuNkWwi0yuki11ppktTs7jZfERe5Gx9KY4dGJ8330SZTZg72YW/hpTMi1oQ0tMMxJ+VXo4LhxbPjI9dgttTy3NKxXCMNh8MXeYvOW8IDLoCd8o5AV2ZAg3LilUlSRcV1C2Mwiu7MZZLkn/AAzXVNybFPjUAylRa63I+Nbn7OorcPgNhdlubc7nc+dfPnfN1vy1rSey3tQigiSCTDFVQAZozf1JBq+i8ujAmmxHtrP/ABWHH/tH/VQLGwykG/K3T40Q+0ftDBjcRHJASVWPKcwKkG5JFjQyrjrUzd5HRWgs1P7NH/iF8zSeBYA4nERwg2zta9tq1nhvsvw8LBzM7MDfUgD5AVVJoJIp8UAptbY2on7H8YzDuXOo9wnoPwk+VWacIgvcgMfOmuJ4CMBSiBTfl6UMJuLJcLg725x2LMgTDFrKL+C1r+ZNXHAeKSNB/wAUv3nNRqLDmT5033VtKaF7nQ2vRKtJNsHu0O4yTPmCjJdSoI5A25bX0qBwothkZEdjma921sedug0qRGGF7U1k20qHVm+pOSKInabizpFq5JfS17XHPby0+NZnBA0zknQbn0H+1F/ayTNKqn8KEkfzE/otU3BFAVjvc2+VTq1qSt9CVh8ApsMuw+VWrdm4pUFxla24G/nSeEr4tRRTgkpOrPXQepQVtTPsd2SdDbfodr+Rvz/v07h+HCMVYagi4OhF9/h51q4waOLEfMXvQzxrhCrKkoXQBlI63Fx+R+dCqktmdKlHdA3xLACSOQLrzHUHlf43HoTQUK0TCwlMU0Z/GgPldTp+QoAxy5ZJF2s7D5MRTlGV1YUqxsybg4UbKL2YmtT9m8JXDyXNz3z6+lhWNxykEVrHsu4zE8LwXPeIzO1xpZ2NrHnTVN6i89g4tXhFLqg7W9qYcFHdvFIfcjB1J8+g86uvYAm8a4tDhozJMwUDbqT0A51mXb7ij4jBxzHRZJAUS3uqL2zHmxqjnfFcRmLyNoOf+HEOgHNqte10KjBYeCNwxRhfxC9gDqaXqVW9EWRjbVkjhMjjAQ5GKnxbc9TQzjO0GIDlS5JH97Ve4HE2wkcSG8q30CGQak6HLSYeC499VjbXpGqfVrGlJU5OWxfGSS3KbC47GSsEVmF+ZBVRpfUnaqniTN3jEnW9jrrewvR/H2Kx76swH80mvyUGvJfZviGYsxiJOpN2a/ztRQpNPYiU0wG4dxIqQDGknLxLc/OjgsqIXKqgRbkDQX9edUXG+DScPliaQRsdSoUWGmmvnrUbjPGhPGsa+HUFhzJvoB5CjaANM4HhYmgjZgGZhmJ65iT+tdQrhsXIiKoJAUAW9BXVT3TfUuU0FWD9jGFH7SeV/TKo+gv9az72j8IwmFxX2fDKfAg7xixbxnW2p5C3zr6A4/xRcLhpcQ50RSQOp5AeptXy5jsW0sjyyG7uxZj5sb/LlRwbYElYj4bD53C5lW/4mNlHqa9tYkaaaaeXSkNvTjnyvVgJYcFxjRTJIu6nT46frW/4Vy0akkkkDW1uVfOMEtjcXBGo8iK0zs97TdFTEptp3iD/AFL/AEoZanLRmjqh6V5Py52qDDxlJVDRuGU7EH86fjazG+2W4vVQZHca0iJN9bCvZXUm9wNetNFuQBNugJ/KpOHsi02ct7CkfZ5ydIn+IsPma9j4bO3JR6sD9FvXEGc9tHaPEya+8oI8gFH/APVReDALCpc2vrbrfarLtphnGOEDfuBiQDoCDc6/L41B4jgHzKUHhGm18vw2OlG3pc5LUIeB42I2FxfzPyoviRbXBG35VmWIwd4XZ3VXQXjKjKxI5Nyta5oi7AYl5YmMjHwiw+YJpKae49B20DWG5qRhcN3hysLjof79KB8R2lniky5FUZrEsSPTlajbs1iWkIY2HQjUG1r2PxG4oYq7QUnZMoOMYUDiAAGir+SXP+oVmHEeFySYiYqtwZHtlDMfeP7orZO7Uu08ulu/J8kDBQf+0D51XzdrMMu2ZvRf62p2jZXYjVbZm2D7HYliPupCPQL/AKiKKuy3s/xSOzghM2hu/K99lX9aspe2y/hiY+pA/K9SuFduHvbIq/EmrJyVitQbCyDgE4WxxCj0jJPwJb9KHuI9goC5eSWR3O5si/ULf61aLxyWQ+/lQb2AufIXqfEveX6c7/r1qvvgu7sC0fY/BJupP88jEfK9q9GG4dDsIFt/LeqbtzwIYco6uSkhbwk3ysLaA3NxrQrHETsp+VWd6QqdzRH7TYRNA9/5VP8ASosnbSIe7G7ethQSuHbXwnTfSuyEWuCKB1WH3XIWHtq5NlhA9WJ/Skydp8Qdgg9Bfn5mhuBNaJOG4UGx/veqKleS6lkKUWBntAxMrshlN7ZgugFh8KDIJAzAba/lR77UwA8QHRvzoC4al2J6frV8JNxTKpq0mi8+0t1NdTAJ6V1FcE0P259ortHgkOi2kl9fwKfqflWSXrWOI9lYZZXmnmLSO2Zz4AL+V72Gw+FKi4Nw6Pcg+rn8lo1Ty7sBzvsjLIMFLIwVI2Zm0ACkknyomwns74mwt9nKebui/wD7E/SjaHEcOjYFY1JHMKSfma1Hs9xmKaEOg8trbUM5JbMKKbMPwnsix7e+8K/97n6KB9avMD7FX/xMQ3/RGF+rsfyrZvtflXhxJ6VXnCyMBezvsviwzFg8rEixzOAP+1F/WileziWAIBsLC+Y6fE1YfaGpBlPU1DmicozFwKJdgB6Ko/Sn14fGOZ/7j+QpBJryozE5R4QQj8K/K9Od8o2H0qKa41Gdk5TKfaxh3GNjmC+B0tm8wLFb9bBTbzoZ4dj7uVY862Ttcl8FiRa/3Tn5An9KwWAak9D9T/Zrm80Q4aSCDtEQsYAIzNparrsdgzHFr5/UUBT4iUOXXxHa5F9PLpWi9lsSGRC6tawuBa99ra7fHaq5RtFIYpyzTbJON4arNmIB2uCLg+oPOiHs+DnNhYW16XF9fLc1CRCzMOQ2vvl5fGrsvHBh7kqgbQFiANfMkefyqundv2CqtJW5Aftfxq6CJBlD3zDnYMdNOpH+XzoNNW3aPExyTsYv2agIluYUanzuxY/Gqo701FNLUTm05aCVFXfA+GCXc2tVPGNaIcJgpETvc4VQLksbADzNDPhHRPcTiJI8UkGttMu+txv5jU/Kp/tF7TTYOKKGC6Z1DPLbXLewUdGJUknkAAN9BLiHanv54UGiLIo7y3jNyAcl9hbrvRT20Cz4Rpc2YoqBtgDErePTrZi1/wCEVRUrww1SEaq1kSo95fKyrm7V/bo480YDRAiwJyszW8WxPIDKfPU0wpyMrToXQHYHLfTMAbbA6a72v8AfBY58LKw3HusOovcH8jRlBxYTrmDl10zKT41+vl/Z1p2rSv44bcF2FxGW9Kej2v1LCFmkRzKq9y5FnhjBWB1tlZrDPkIJUlrk7jUUjiEUeHggDoM8hlYsklmMeZcjhgSjAkva4NwBa1qiwSPA/exe6D4Trpfa4Przqy4TOC2eED7TkbN3gQCUXzZIitjE4ubFdzvysVOpTlJZ0uOL/YCvRr0otU5Nre/Vfcq2TKFkBzIxyhgMpDWvkkXZWtc7kEC4J1tY4HF21FJiJxJaLv8AEhgpkaPESPJFaLx5s6tYAWGpQa1U4acizC4uAbEa69RSmJp5JWashzCxhiad01mXGl/dFd7RMTneM9AfzoW4Wvhv1NEHbQlsjgaag+Tb2+I/I1S4RCFAq+FsisZ1WEozaluS8teU8kJtXURWT3a+5+dOgbU3FEWNhTliDrVRYPRVq/s+wmWAMGJDa26Gssg3JtcVr/YWB1w65lA5j05VXLcJbBBavaXlr3LU2IuIFeU5aktXWOuJrrUpaVauOuN1xFLK1xFQSMSoCpB1BBBHkRrXzjw51EmRtVYfWxANfSZHXavlySUqwI5bUUVdM69ncuMArxzZEmy63s4BVue52NHHDsRiAwzRI6bsytkI1ttc35dN6HOBTxTgBgLje9GnDOGodIgADyB51VOWthymlluWnCSZGN0y2Y6XvoQeY32Wqv2pTWWCIbDOSPNQgHyDN86I8Lh1iBbmtyfNtgPSgv2gXvDffK/zJW9HSVhetqrgkgrrb0sCojcTjVtQWHkbfI86bp0pVHaIpOpGCux15VXc67252G5qux/E5ZgFZjkGyX0Hmep86kzrC92UTq5WwzGNk3vY3CsPrVf9lbm6j/pJ/UVsYXBZFeUfF9PgZ1fEqTtF6fUZwsX30X/MT6sBRpErHNHfwspVgdiCLH6GhfB4NzIhUq7B1YKAQWKsDYWJ3t0rWeA9jGlHeYgGPN/hq98t/wB5wB8rVh9uYKrOvBqOlvTkbwNWORq5j3D8E08jRnLmUEMzcu78N7eZy/OpnaDg5wJgliLq0mtmGhW2hJvZgemlaDx7sTIkobCtknS+RhYZla5yuDoee/O9DfHMBxLFsmHljw6tGbjKUjBNrXOnmdBprTMJKSUb7Byvdy5PeFYpZ4MyoVk1LqT4ZFvbNHcciLFfK/I0rBd2zZSLeIEG9jodienyqpPZ7iWEH3sEpgUk3hZZMpsRmXKSQATexABtrVh2YEmLxJUZXiC3eVLoASLqbEe9tdNNuVU1aUZXaG6WJlZRk37hwvBo3hKxkx3NpQpGaQm7ASMbkjXa9jYVQ8R7MFL5SRppm1v5XAsP72o84ZwxIh4Nz/e36VZ/ZQRYrY9d6yKuHrt3pzbt0YzQxjo9NzD5MN3ivE6+8Lbaht0I+NqF8Kt62ntJh4MMHc5SyIZD1CkkcuZbwgHctWXdmOEviJFjQanc8gOZNN4WUsjzq1mRjqsasoyjwdHAbCurZ8D2dgjjVMgNha5FyepNdR9+uBbujHMMhvpT2JXxV7hUsucHW+lKmcu2Y71ZbUA9hWti7EQTJAFkZWXdCDy6Gsr4bw6WU2RC3oK2nszgzHh0VtCBrega1J6FhlriKdC16VorEXI96jYpDa4qZOnSmZNVPpUNElXLxuKIKHa2Y2qyXEKRcHSsp4lxtIp2kmGZUJCJpcnyH68qquI+0jENpCiRDlfxt9bD6Uzh8FXrK8VpyyqpXpw3ZthkFr3068vjQ1xzt9gMOCO9Erj8EXiuemb3R86xHiXGcRP+2meTyY+EeiDwj5VAZb1qU+x0takr+iFJY3/FGl9ou38s8YjiQRB18ZDFmIO6hrCw+FZoYM8mW9rnSpOExxWyyC6jS43tTrYdT94jg210Oqm/Mbis3EYWdG91pyOUasZjnBeBSGQ/eFCpsSKOMJwaRBm+0Pa2my/O1UAxIiN2HvqDcfp/Sq/iPaxsvdoSeVZrzTH1lgF2P7TdwoBfPY3151W47jZxwiyx5AhYM7ElbGx8NhmJFtgD1PWhbDcOZ7SYksF3Cj329L7DzqfJMSAqjKgFgo6A31PPr01OgrVwPZlSr4noufsZuN7QhT8K34Lp+IQxKViXMx3c2LeYG6IDqCAHuD7wqmw2IWMWWGEj+JMzW6F7hj8TTKPYjfUkA2OUkbgE6EjmBUmLCGU2Ua+VvyJ8634YfD0IXWtt2YkqtatPK3a+yG5+IwH3ocp/eic/6HuPqKqXKMy3mVUZgMzA3W/NlFzapuK4HJmATUm+hFvLnsdqqMZgz4kyOWBtciwBG9h63FyaoeJ7yLVJsaWG7tpzPoHsd2Sw2GjDJZ2ZQe90NwQD4CNAuvL43q4xvEooisdwHfMVQbm1yzWGw6t59SKy7sX23XC4XD4WYSGxYGQj9mhJYAgk3y3t0AW/lXnaziEiyPh8JILPGHxGLZ7yNmLDI8gHgGmiLY+Kygc/PYiVZ1O7s8z5NKDpqN09AnxnaUfeSQBJMQrBEw5kUPcg2Mgv4SQrEKbHa9iSAC9r+2EYdPu/+JCjvVVhlje2q5xe5vfa9CzYdBol/Ntix625DoKqOIYO2o35dT8Kbj2dUpUszldlMcXCc7W0CPhPbzERTmQuTGxGdbkgW0zLc6eYGnletD4bxtGkfKoBdr+EAZjoL6bk9ayHCcCmKiSQd1Edmfdv+Wu7fDTqRRH2e4okMsbHMUT8Tm59Wt/vtuaqlhqsqd0i51qcZ7m4QzrEBnK522BNh529K9kxxkusZDlGs7E5UW4121JA5DW+h51AfiEEkS4ggxxZABI6lZX0OkKnUA3PiIB6ciBnGdp7KRGgjiXREHIX3bqdzfzpRNRVkXLV3YKe0DtA2JxBwsdzHGwDtpmmkGxIGyrchV8yTrsb9heDjDReIfePqx6DktZx2WdTO2Ik18ZYDqSTb5VpGE7QKfKhq3Ssg6au7sLFeuqnXi62rqVuXWM8xLQOY1SyqqDMbWu1Rv8A099SgzqOa6iiWXA4VIyoDMxv3YA39TU/2e8Ecl2dSF5E9R5U6nwKtclp7OWdUKNCQt7hz+VHuWmMJhljXKKdZ6lKxDFEV41JDikNJapudY8k03oF7e9rhhEyRkGVth0H7zeX51a9re06YSJnOrW8I6nYegvavnziPEZJ5GlkN2Y3J/QeQp7A4VVpZp+VfUoxFVwVluKxmKeRizsST/enSmRXibV7evSpJLQy3qe0k0lnpppahzSJUWx1nqNJJ8KRJIetTcFwwtZnuF00FsxHO19B8f8Aelak3LRK5aoqOrdhvCLicQVijzv0Gptfz/SiDCcISC+Yh5gSCNCEI3vyuNRbXW46gFcGIiw+Hy4OJ4C65e+xBRSN7tGqFmdgNrCwOuuxp4sBCEziV2AOXwR7G1/xuD9KRo4aE5Z6isuLbv1LK2KlGOWm7vngr2bN4mJv8LfDoKaeeMFUOYE2JK2NgbG9jsbevpVzhcMCwSNiWtmyyBUBBA2ve9rm/wDd6SThcge7wubXsVVrm2xFtLa77Vdisb3cckNxfCYN1ZZ57e6NLwUWDxGHES933YAAQm1iNjm/Cb8zY3qhkwQheXPaExg924YlZNOlmOgPLmKlcBwLx3uySR87NqL62Gg69BUbtREQrKM4XXIWIJW4AOg1sf0rIlVqWtF7mvQoUVK8le2pExMTXL51dCAWGUgjkbHVTuNOdzVVi2DNcEm/XfTT8gKuOBYdponfPYt4Srgm+Wxuw6nQg6k01FwKUoWNla5GQ+RtcEaefoa08HPC0G25q+3X8+JmYtYvEf8AR23W2n5wVqWXKylg4II20I2IP6Wp7tDhQ/d4iJbCbNnRBfLNGLyWA1sR4x5XNReJJJFYFCGLBRf3bnmTtV9hsHg8FaaeX7ViBZgiN90jG1szroToBZd9jfena84uScNX9LCNKEkmp6IoOD9nsTiblFEca+/LJ4FXrcnQem/lVoxwOD/YqMRNzllF4wf/AG0bVvVtOgpGJ4hjeIkKoZYxqqItgByIXZf5mufSq7iPBTBdXRle19WJY3OhuDrrQwg5u8vlf8/b4hSqKOi/Pz4/Ag8W4k8rF5WLMdOrHooH6DSibs/wiKKFcRigjEnNHEtmJI2DnY2O42HO5tUHg3CRCS8qZpT7qHcCw983uoO9tCfLeiEcClkOdzcm3oByAGwHlXn+0cVKs3STyxXHX+DewmFhTgp7yfPT+RjF8RmxD5mvb8Ki9lHQf1qJxrDsITob2+Z2Fvia0PgnCVVQCKVxvg6PLCTayG9rb87/AEFZ0ZJbKyQ04mfcD7JPZQ2gtRng+zMYGoq9SMA6CnqidRsKMUtipXg6gWrqsjXVQWXMnw0eJYgAOxG3lW0cGLiJe8ChrC+XamsFw6KK5VRc7nmfWpBcAU+5CaRL7ym3k86qcZxdU31qvxfHAELcuVQ5hKJfyYgAVQcW7TKp7uMZ5ToFHLzY8hQ5H2immHdQrmYnVz7qir3gnCkw4uQGkPvOdyaFu25KXAA+0pJIsOnfNeWZ/gETUgf9TJWcXspPlRl7X+JGXGiMG4ijVbfxNdz/AKk+VBndl2SIaFmC+mup+Wteiwf9LD3fF/mZtbxVLFtwDgeIxRCQpewGZibIv8zfpvRVjPZlOsZZZ43cD3MrKCegcn9KLOzTRxxpDCPD5bkn8TdSaKpJYYgvfSKrOcqKSAWJ5KOZpKp2pVlK1LRIujhYJXlufNEyMrFWBVlJDA6EEbg0yhLNlQZj/fyrWPax2bSWSCWNkjZswkuyIWVcuUgE6nUi+v5UJ4XBwxAr38SDmVWSVj5m6oP81MyxVWcE6cG2/wA3Op0qKl/Vmkvr8ilREwxBkjEzurAa2CMbAMot4jvvainhWLjihM7RsZCcsWdD3a2Ni5b3Sb3AF76U9wjC4V5FlMeJlhEbAyP3eHjzlo8ndvnAIt3lxdjtarbH9pEAyRBVQCwSIeEAf+5Kuvn92PWowc8Tdxavz/sp7Qjhn4oO3F+P9gxJO7vnZszHmx+Wp2H5VcvcRt3arlFrjT3gQCQQb6aa3/F51XLgQ47wQAKDfwkre5JJDvm8/LyFS8Lho2jJTO9tWh8KsAATmJF8677edaFZZ7RkkrPbdfnuZtGfduTg3fnqSo1jjCyMTnzBhbS4ve1xfS9uVWz9qIU0bDPGUtYEKFYAjRWuLaG+o0t8KosCO9DMbKEAIAJ8xzJN7236mpLcSDEGRPTMQQwsTZ7WPP51m1MM3J6arj6DscVlitVbone/q2Lm7RrMGVMsDsfxWlDLqRqBYaAa/nVLxd8TKokMit3RUhcwKkIbjN0/v1q6x+LwwVWkTUAFGTXUH3TYi4+NU+Plw+JaNFUxMzZS4tlAbRT8Gsd9LGqoYSTWYYeOivBb5ff8uE8HEDJkEytDIw0BtoegIuD6GrEPlsky2v7ki7N8fwt5HfzoL4Jx0GRsPjFu6+Fr6jwm1weRuKNcOxQeI95EBu3vAdW6jzrHqwcJNM1qc1KKaKrjMs8KiU5Xg0z6ZWRWt4jyIF9TXvGeAR43CrLBo4HLTNbdG5fHkat4cQoW+pgY2U9L3Bzfw30uetL4bgRhyREfumN8n7pO+Xy8uVdCpKlK6OnCNWNmBvZPj8+Eth+571c3u3yyqedzbxAW2YC3W1WHGuJiWUuqZnsApNmEYXkvJmuSc2w5X3qx41wRjJeMACQ3ew1J8z0Ntuu9WnCuABQL09XxyfkVrrUz6WBy+fW2wKcL4bMTmsdTe53o64dgnsL1Y4fCqulqlxis2Usw8lY8w0Nqam1Y+VSyaiMN65IgSopRNhXnKkk6UEg0e11IvXtAFYZx/aOCI2Z9eg1+dD3Ee0T4hSkHhB3dvCLeXWs8eck3JJvuTuaU09yLEgCtHuhPOGsuOSJLSyZiem5qJh8DLiPEzhIuS31t50OvLFoLFmO7MateEzd3qGLnkq6gUDjlWm4ad3qGOFSGNcqMFt+6LX9TUnCySE6kEVTQYeaU3IVFPXermyQxHMwAA3PX+tLN62LuhgnH8cZsVPMdc0jsPTMVT6AVUpiSrqw/Cb/1q6XszimFggvpc51t6aHqTUf/AOGpo3PfqUA9CW/lO1vOvQ1q0FBRvpYzaVKc5aLU1H2UYpZcxDajQDmBuR67D50Je0WaUY95ZHYgSZUKm2RVtZU6HnfmdaHcJjpYXzRM0WUHLkJW3rbf41Y/+qq8PiUyyzg95LIMxW+vdRE6KQACzbk8wBSGHjefhtbe74G8TT7uPi34RZT8SfHd2+InyFI8oJUuZFQnWNVIGfctmI67aB/CRxg2w+HLsNe8mAlYeYS3dx+tif4qCsHjDE2XW19DsykHRh0O/wCVXEWOnZlhD+Fz4EFghJ1vblz05cq1sPWhl8WqXyXw6mTXpTv4NH9fmX+I8TZp5y7dFPeN6Zicqj0J9K8GOC/so1X+JvvH+bDKPgoqK3DcQiGQ5JIwgclM18ht41uLMouDpy1rwCtejOnVXhe3Qy60J034h6bEuxuzsxO+Yn6a0mJ2WzKSrA3VhuCP/NMvKo3NdhsSC1rEn8O2p6VZPKotFKUt0EnDuCqyDEs+WMqSw2IcXDL/ACncHfXyqq4niIzIyxkFb+E7WI109f1p77RI2ExAkLDI0ICEWAJDi4HWyj5UOC9Z9ODk7t7aIZklbRW5FSOTua8CMfCilmIJAHRRcsbbADUmpGDwsk8qxRIXkc6KOnNmP4VHMmtZ7P8AY9cEhJtJI4tJJb/Io5J+e5ocRiVT8K836F1Gi5LM1oD/ABXsliPsrHuozOSZZJQWdpHbVrBVUKvQXNvUk1X9iuOuVySg+DwXtp8eg9a0vgWLVYMjsAYSYjc7hQDGT1JjMZPqazV4LyzyxsO67y0Y3uBzv5m/wArzteUcrT3N2hGWZST0CvDR5cyjVdTY6kX5eYvUkQgKLC3l5afKqTg2NcZtyTawPI2AtfperXD4sBowxJMvujyGjOfiQAPM0lCMqjyxQ9OUYK8i2RBpzuAT5eX0qUtR46czVXe5DQ8hp5aZWnkqQDpm0pg17O4v6U13418qJs5IUxpqRqjS427WHL9ajuzNVDZaojkmLW51FdUQYC+prq66JMmzVKwuHLnKoJPQC9EXBeyedQ8xyg62B1/2qyl4lhMGCsS5n8tfma0JV9bR1YmqXWWiKqDsrKRewHkx/pRDwdI4EJcwi25X+tDGO7UTTeEnu05hd7etQsXxJSndooC9eZ9TQOE5aSDUoR2CrH9rb3XDIWP71tBfnb51S47ixmASVjcba2sTzt1pWCgMUd0cE2zG258gOYqq7uLEkliVl2BXQ6aDQ6E3vuOVTGMY7EvM1qP4bhc8ciyRHvQupW9mI8uRNX/H4/tOEzxrmdfEo2Jt7y+RtcWPO1N8BhkwgCytmRz4XtbU6hWGtj8bGrGZO7kzj9m5uf4W2Pz/ADvVM5XkMUk47GT4mEOuZdj/AHr0pjhilc0bAmMnNpbNG4/Gt9+hHMVb9qSsGNkA9yQLIw/dL3ufmL2/iqvxeH0zIdxoRV0Zum/RjcowxlN9JIjPh0lkCg5iSCWU2BUHx3DWINr6WvepcH3bLD3mSJ3Fy1j3brzv+vMaHrRRBwbBYlUkgHdlUIQEmySkf4w3bXnz9KpouzGOnDwGBBKv4i4Ga2txbS5AGptvypyElDy7fMwqkW21Lctk7Z93gZ8M7GSRgY0Nhl7sgqWDdLFrLbc71F47w1YEw9pgzSQo7x65oyyg68sp1tz0PShB1eN2hmVkdDYhhYqehH93o7i7ULJh4oFw6jFdz3BmyZ3eK1gIwBoStrk7a23rRw8nFp09nvcRrRUk1PdbA3XqiiCTsbi1Qu0ZAAuRdSwA1vlBv8N6pI2jZgiurMdgGRR8Xdgq/E1qd9Ts3mXzRnuE72yv5MscViiMOsRYszMHN9wiArGv+Z29CtK7O9nsRjHywr4QbPK1+7T4/jb+EfG29TOH8CgVs2LxWFK30jTGIAf+Y4GY+i29TRfB2zw0ChIpMOEUWVY5HZQOgEcJArOqYxKLjS+Y3DDO96iJ3ZLs8+ESRYZB3oa0xeNWZualSCCYyNVF9NRuDVhjeKzwqWlmgVF1ctCy2Hme9+QtrVHxTtukSLipF7tspCAFi0ynXKY3VTobMCbW1vYNrj3ajtbiMfLmlOWMG6RA+FfM/vN/EfhasxNzf7mjky6/QI+1vbQ4kssF0jLEMbZXkHLzVbWFtyBr0qbwPGP3QUglQNwD9aBeCxh5AD+8Nt7Vp/DriFsrI4/dIswB5ab0pjHFOyQ3hU2rsseGQllZtlUFpDqNByBPM3HzqPBjTJLA/LxH4fhA8hlA+FXHCowY3UOSkkR8BOxFr6ediKGcAArgAGygKAd/Dct9SB8a0uxqcXGb6mf2tOSlBdDRwaUlVyYxQo13A/KlpiydFFYEo5ZNcGsndXLUMK8OIA2qCsTnc1Mgw9q5XIdhooW2vXn2IcyamhKS4rmiLkMYRR1pRw46mn2pFDYJNiBD5mup6urrEXMRx/EpJDdnJHS9h8BUQPTGavM1aisthN3e4+WpWUEHXkaaDEilpJblUNkpHmE468YBZfCAB56UX8Amw2Mju5Hecm0DLY8j+lCuIlibCmEgd7n0/k3v6W09ap4MI0bZorqRsQdaotf0HKcJWulc15XDBsPPYgiwYbN0I5qwNj5cr1FwcjL9zKc1hoxGjrfQ267C3KhmHj6yYcpLmjkTxI1iQWXUWIvvsR51Z8L45DiYQZG7t1Gp2ZTbcX3H51TlfUusV3F+yyCOcIsk2JleLI7HRRIzuQNfwpC2ZmsACtqC8Lie7domZWUMQGU5luDup5qetEnAOMSvL9mxEgMckjO+fwiRxFaKORrgCIssYyiwNze4NK4tgJ5okhxIiTFNKTFYRKywpE7yd53IsEuoy310PKtDJmhZiEK0qNXNEp8JxFsNKHXVT76/vD+vQ0Qcf4kuaLFwYoxpmDlQTme34CoO+hFjprWfx4m4yn4H9KVhYwXGa1hqb7aW0+ZHrVcE14RrFSp1V3q+IVce4seJSIZVEf4YgiBpTfYu2mnltWg9heAx4RAffmIAeQ62H7iX2UVl2GlZJQRYHKza+9oAL/w+9oPKtQ9nuJ78nNsoFx1Jrqs3HwREoLN4mHWFwhfXZevP4VnHtN4NFA8csRW0pcOBY2dbXI6Xub+Yow7Q4t3EkN5IVA95CFOUC5d3uMiGxAIPI9RbLsVhGxkx7i8cCjWWTQta5eWzE5ASSdfXcmr8HWVCpmb06+vpYrr4eWIjliv49blKtywRFLu2yKLsf6DzNXSRx4MhpiJcVusSn7uHoZCPefy+VtGpqbisOGUxYL3jo+IPvt17u+oH8R16W0NDynW/xrahTq4jWp4Y/wCPV+/2EJKlh9KbzS/y6L2+55xyaSZ2kkYsx5nkOQA5DyFD5WzWoknFVXEIbeIUWLwySzRWxFCs3pLqL7NzBZwT1FaTBF3czj8LAH9ayfhz2f4flWwgZwj35CvLYze5uYXawR8AjDMpBFwDp1Fj9KDocYTiHuNi3PoxY/Mj6UU8Cl8QF7dD6f3apPEezcAbvFju7O2e7NbqLLe3OmuzMZTw8ZOa34Fu0cLOu4qLPOGwXVWIv/tpV1EQPw1FwcWUWtapSVlV6qnVlKOzbHaUHGCi+iJKzDoelS1GlRMPH+L5VKvUxvbUiVuhzGmWek4h+m/KkE+dc2Qkc72r0U2aUBUEji6iupYrqKwNzAJJmboB5ACuRD0qzthR/wDUPwFKTFwD3YifMsf0prNwirL6kFcM/wC7S1wzc1Pyq2wvGI01WAX6kk1KPahuUcY+F6FylwFljyDuIhFx4bHqd/70rxVqVxPijzSWa3hXSwtvXnDsG08qQqbF2sW/dUC7N8FB+Nq7Vs08PKMKObpqRWSyGRiEiDZTIwJGY/gQDV2tc2GwGpFG/COxWEmUOuLMuUgN3Xd5LjUhhZiNNPeqy7U9iY8ThooYm7ow37vS6nMLHPzubXzb311oR7N8cTAcOxagBMZHKwZWN2LXVFYLzVQfTS/O9MRpRSM6rjKs3o7L0F9puwr5XfDP3/dkhltaQWJuoto5FjpofW9UHZ3jaxpKO5w4dYGWI9yGlkkdljCkm+bwu11tqBWv9kcD9mwUSvYPl7yZif8AEfxOzE87nfyrM/aHwpI8SMThWGWUd6pjbTOjZZChXYg5TpzJq1NRVhZ5qkr7spONcCmlvcKcTGhkmjiSOOLDworMBMygDvT+6NgLelHwoqWu18yjwgC5ZuvQWF9+oow7N8SSSHERyyLh4FwxD2uXlkmdFklN9ZJSudQNhmA0FB3FMTG02aCPukFgi3LNZdMztzc7m2lDImEraPZ7k2PDSFgxsOQ53zW0PMk6aCtR7BYSbDXklUIGAtFqZG38RH+Hvsbn0oJ7MY6XR0jQyNorMrkqNB4ArDQ6m+/rpRHxDtU+F0Dh57HwhQqITzfdiRyXNz15CqqUHVqWWsv0HMUo06d4rLHpd6v4F/2x4mxVftR7gZrmONszTKqkIoB1tdrksAFKC173rO+M8beYZFHdxDaNedubn8R+lV+IxkkzmSVy7tuzG5P9B5U05r0eF7Pp0vHLWX6e33MGtjKk492naPHJ4m9eka15HS2rRS0E3uOSDSo0keYEVKTUUyN6KSTWoMXYH8ELP6VqnBMVmij80H+XQ/lWZtHaZx53+etHXZGb7u3RyPgRf+teJxsLXXDPSYSet+QuwUliCOt/1o0uJIw46a+ooEwosbfKjHs2/hZDSNPrHkaqciRUrDLc+Q3qOV1t51KGKjUWzCqIR11JlLQlikyPUf7ap2NeGS9XtlSR6etJka1c72FNqb6nSgYR6l7a6mnoqZyXNPrUxIY5XV5XVYAY60K/uj5Co06DoPlXtdTBWMgUuwrq6oJK+f8Abj+Q/pTt/Bif/tX+s0AP0JHxryuqY+dDa/4kvf7FXw/jmKURKuJmCjMABK4AAfQAA0awsWw+EVjdXhxDup1DuY5mLuDozX1udb11dTJmgT2i4pPJIqSTSuhQEqzsy3DNrYm19B8qIMN/8hgv58X/APkhrq6gq+RjGE/vx9wSx4s72/eNR466uoo7IpqeeXuzR+zDlYp2UkMMO5BBsQQBqDQO5rq6nuxfJP3D7b/vR/8AJJhrx969rq9Etjz/AFPEpxq6uqY7AvcXDTTb11dRdCFuyuxH7f8A6R+dFXZ82D2/fX8q8rq8h2j55+/7m9g/LELMPv8AAfrRnwL3mrq6sml5jQqeUpce57xxc++an4GJeg+Qrq6ikVlpGottXoryuqoIQ29Lrq6uJHIt6dWurqOIEhuQ617XV1Scj//Z" />
                </div>
                <div className="col-md-6">
                    <br />
                    <h5>Marcos Perez</h5>
                    <p className="perfil">Programmer</p>
                    <p className="test-text">
                        “Gracias por liberar y ofrecer este tipo de cursos en estos tiempos de crisis sanitaria. Es un excelente aporte para el auto aprendizaje guiado”.
					</p>
                </div>
            </div>
        </div>
        <br /><br /><br />
        <div className="main row">
            <div className="col-md-12 test-izq testimonial-cuadro">
                <img className="img-testimonial" src="https://www.jovenesprogramadores.cl/wp/wp-content/uploads/2020/07/comillas.png" />
                <br /><br />
                <h5 className="titulo-testimonial">
                    “Supe de ustedes por un amigo. Quiero actualizar y adquirir conocimientos en lenguajes que no conocía o que conocía pero por muchos años no practiqué y ya no recuerdo.
                    Estoy feliz haciendo mi primer curso, lo encuentro muy bueno e interesante, recién terminé el primero. Recomiendo el programa recomiendo 100%”.
					</h5>
                <br />
                <h3 className="h3-testimonial">Consuelo Contreras</h3>
            </div>
        </div>
        <br /><br /><br />
        <div className="row">
            <div className="col-md-6">

            </div>
        </div>
    </div>
);
}



