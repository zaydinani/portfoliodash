import "../styles/sidebar.scss"

function projects(){

    return (
        <div className="project">
            <div className="img">
                <img src="./wallpaperflare.com_wallpaper (2).jpg" alt="project logo" />
            </div>
            <div className="project-info">
                <a>project title</a>
                <p className="date">14 jan 2024</p>
                <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus reiciendis nesciunt quam sed vel pariatur, eum repellendus eveniet. Porro ipsa eos hic quidem dolorem ratione. Architecto iusto sunt rerum sapiente.</p>
            </div>
            <div className="actions">
                <div className="delete">
                    <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 4H18V3C18 2.20435 17.6839 1.44129 17.1213 0.87868C16.5587 0.316071 15.7956 0 15 0H9C8.20435 0 7.44129 0.316071 6.87868 0.87868C6.31607 1.44129 6 2.20435 6 3V4H1C0.734784 4 0.48043 4.10536 0.292893 4.29289C0.105357 4.48043 0 4.73478 0 5C0 5.26522 0.105357 5.51957 0.292893 5.70711C0.48043 5.89464 0.734784 6 1 6H2V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H20C20.5304 26 21.0391 25.7893 21.4142 25.4142C21.7893 25.0391 22 24.5304 22 24V6H23C23.2652 6 23.5196 5.89464 23.7071 5.70711C23.8946 5.51957 24 5.26522 24 5C24 4.73478 23.8946 4.48043 23.7071 4.29289C23.5196 4.10536 23.2652 4 23 4ZM8 3C8 2.73478 8.10536 2.48043 8.29289 2.29289C8.48043 2.10536 8.73478 2 9 2H15C15.2652 2 15.5196 2.10536 15.7071 2.29289C15.8946 2.48043 16 2.73478 16 3V4H8V3ZM20 24H4V6H20V24ZM10 11V19C10 19.2652 9.89464 19.5196 9.70711 19.7071C9.51957 19.8946 9.26522 20 9 20C8.73478 20 8.48043 19.8946 8.29289 19.7071C8.10536 19.5196 8 19.2652 8 19V11C8 10.7348 8.10536 10.4804 8.29289 10.2929C8.48043 10.1054 8.73478 10 9 10C9.26522 10 9.51957 10.1054 9.70711 10.2929C9.89464 10.4804 10 10.7348 10 11ZM16 11V19C16 19.2652 15.8946 19.5196 15.7071 19.7071C15.5196 19.8946 15.2652 20 15 20C14.7348 20 14.4804 19.8946 14.2929 19.7071C14.1054 19.5196 14 19.2652 14 19V11C14 10.7348 14.1054 10.4804 14.2929 10.2929C14.4804 10.1054 14.7348 10 15 10C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11Z" fill="#FF7F7F"/>
                    </svg>
                </div>
                <div className="edit">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.4138 6.17125L18.8288 0.585002C18.643 0.399236 18.4225 0.251877 18.1798 0.151339C17.9372 0.0508006 17.6771 -0.000946045 17.4144 -0.000946045C17.1517 -0.000946045 16.8916 0.0508006 16.6489 0.151339C16.4062 0.251877 16.1857 0.399236 16 0.585002L0.586252 16C0.399727 16.185 0.251844 16.4053 0.151201 16.648C0.0505584 16.8907 -0.000836928 17.151 2.48929e-06 17.4138V23C2.48929e-06 23.5304 0.210716 24.0391 0.585789 24.4142C0.960862 24.7893 1.46957 25 2 25H7.58625C7.84899 25.0008 8.10928 24.9494 8.35198 24.8488C8.59468 24.7482 8.81496 24.6003 9 24.4138L24.4138 9C24.5995 8.81428 24.7469 8.59378 24.8474 8.3511C24.948 8.10842 24.9997 7.84831 24.9997 7.58563C24.9997 7.32294 24.948 7.06284 24.8474 6.82015C24.7469 6.57747 24.5995 6.35698 24.4138 6.17125ZM7.58625 23H2V17.4138L13 6.41375L18.5863 12L7.58625 23ZM20 10.585L14.4138 5L17.4138 2L23 7.585L20 10.585Z" fill="#ADFF99"/>
                    </svg>
                </div>
            </div>
        </div>
    );
}
export default projects;
