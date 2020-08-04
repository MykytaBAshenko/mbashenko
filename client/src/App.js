import React,{ useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {listProjects, signin, saveProject, send_change_pass, deleteProject} from './actions'
import {Route, Link} from 'react-router-dom';
import Cookie from 'js-cookie';


function AdminScreen(props) {
  const dispatch = useDispatch();
  const technologies_for_click = ["C", "UNIX", "React", "Redux", "MongoDB", "JS", "HTML", "CSS", "Node", "GTK", "Algorithms", "PHP", "SQL", "Express", "Python"];
  let techarray = [];
  for (let i = 0; i < technologies_for_click.length; i++)
    techarray.push(false)
  const [c_technologies, setC_technologies] = useState(techarray);
  const [modalVisible, setModalVisible] = useState(0);
  const [id, setId] = useState('');
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [Epic_lvl, setEpic_lvl] = useState(0);
  const [new_pass, setNew_pass] = useState('');
  const [c_new_pass, setC_new_pass] = useState('');
  const projectList = useSelector(state => state.projectList);
  const projectSave = useSelector(state => state.projectSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = projectSave;
  const passChange = useSelector(state => state.passChange);
  const { loading: loadingPass, success: successPass, error: errorPass } = passChange ;
  const loading_p = projectList.loading;
  const project = projectList.projects;
  const error_p = projectList.error;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const redirect = '/logining';

  useEffect(() => {
    console.log(userInfo)
    if (!userInfo) {
      props.history.push(redirect);
    }
    dispatch(listProjects());
    return () => {
      //
    };
  }, [userInfo, props.history, dispatch]);
  const [sort_byy, setSort_byy] = useState(0);
  const user_id = userInfo._id;
  const user = userInfo.login;
  const token = userInfo.token;
  let projects_for_sorting = [];
  const [searchInput, setSearchInput] = useState('');
  const projectDelete = useSelector(state => state.projectDelete);
  const {success: successDelete } = projectDelete
  for (let p = 0; p < project.length; p++)
    if (project[p].name.toLowerCase().includes(searchInput.toLowerCase()))
        projects_for_sorting.push(project[p]);

  if(projects_for_sorting && sort_byy === 1) {
    projects_for_sorting.sort(function(a, b){
      if(a.Epic_lvl < b.Epic_lvl) { return -1; }
      if(a.Epic_lvl > b.Epic_lvl) { return 1; }
      return 0;
    })}

    if(projects_for_sorting && sort_byy === 2) {
      projects_for_sorting.sort(function(a, b){
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      })}

      if(projects_for_sorting && sort_byy === 3) {
        projects_for_sorting.sort(function(a, b){
          
          let first_date = parseInt(a.date.replace('.','').replace('.',''));
          let second_date = parseInt(b.date.replace('.','').replace('.',''));
          if(first_date > second_date) { return -1; }
          if(first_date < second_date) { return 1; }
          return 0;
        })}

      
  useEffect(() => {
    if (successSave) {
      setModalVisible(0);
    }
    if (successPass) {
      setModalVisible(0);
    }
    if (!userInfo) {
      props.history.push(redirect);
    }
    dispatch(listProjects());
    return () => {
      //
    };
  }, [successSave,successDelete, userInfo, successPass,  props.history, dispatch]);
  const openModal = (project) => {
    setModalVisible(1);
    setId(project._id);
    setLink(project.link);
    setName(project.name);
    setDescription(project.description);

    setDate(project.date)
    setEpic_lvl(project.Epic_lvl)

  }


  

  const handle_set_sort = (i) => {
    if((i === 1 && sort_byy === 1) || (i === 2 && sort_byy === 2) || (i === 3 && sort_byy === 3))
      setSort_byy(0)
    if(i === 1 && sort_byy !== i)
      setSort_byy(1)
    if(i === 2 && sort_byy !== i)
      setSort_byy(2)
    if(i === 3 && sort_byy !== i)
      setSort_byy(3)
  }

  const set_pass = () => {
    setModalVisible(2);
  }
  const [error_submit, setError_submit] = useState('')
  const submitHandler = (e) => {
      e.preventDefault();
    let technologies_for_send = [];
    for(let y = 0; y < technologies_for_click.length; y++)
      if(c_technologies[y])
        technologies_for_send.push(technologies_for_click[y])
    
    if(link&& name&& description&& technologies_for_send.length !== 0&& date&& Epic_lvl){  
      if(date.length === 10 && Number.isInteger(parseInt(date[0])) && Number.isInteger(parseInt(date[1]))&& Number.isInteger(parseInt(date[2]))&& Number.isInteger(parseInt(date[3])) && date[4] === '.'
      && Number.isInteger(parseInt(date[5])) && Number.isInteger(parseInt(date[6])) && Number.isInteger(parseInt(date[8])) && Number.isInteger(parseInt(date[9])) && date[7] === '.'){
        if(Epic_lvl.toString().length === 1 && parseInt(Epic_lvl) > 0 && parseInt(Epic_lvl) < 10){
          dispatch(saveProject({
        _id: id,
        link, name, description, technologies:technologies_for_send, date,
        Epic_lvl
        }))} 
        else{
          setError_submit("input isn`t from 1 to 9");
        return
        }
      }
      else{
        setError_submit("date isn`t correct");
      return
      }
      setError_submit("")
    }
    else
      setError_submit("Something empty")
  }
  const chahge_pass = (e) => {
    e.preventDefault();
    if (new_pass === c_new_pass && c_new_pass && new_pass)
      dispatch(send_change_pass({
        _id: user_id,
        login: user,
        token: token,
        password: new_pass
      }));
  }

  
  

  const deleteHandler = (project) => {
    dispatch(deleteProject(project._id));
  }

  const editModal = (project) => {
    setModalVisible(3);
    setId(project._id);
    setLink(project.link);
    setName(project.name);
    setDescription(project.description);
    setDate(project.date);
    setEpic_lvl(project.Epic_lvl);
    for(let k = 0; k < technologies_for_click.length; k++)
      for(let kk = 0; kk < project.technologies.length; kk++)
        if(technologies_for_click[k] === project.technologies[kk])
          techarray[k] = true;
    setC_technologies(techarray)
  }

  const set_checked_t = (i) => {
    let arr = c_technologies;
    arr[i] = !arr[i];
    setC_technologies(arr)
    console.log(c_technologies)
    }

  const exit_from_acc = () => {
    Cookie.remove('userInfo');
    const redirect = '/';
      props.history.push(redirect);
      dispatch({ type: "USER_EXIT"});
  } 
  return (
    <section className="admin_section">
      <div className="link_back">
      <Link to="/"><i className="fa fa-arrow-left" aria-hidden="true"></i>Back to portfolio</Link>
            <div className="btns_header_admin">
              <button className="new_project" onClick={() => openModal({})}>Create New </button>
              <button className="new_project" onClick={() => set_pass({})}>New Password</button>
              <button className="new_project" onClick={() => exit_from_acc({})}>Exit</button>
            </div>
        </div>
        {modalVisible === 1 &&
        <form onSubmit={submitHandler} autoComplete="off">
        <div className="form_logo">New progect</div>
        {loadingSave && <div className="error">Loading...</div>}
              {errorSave && <div  className="error">{errorSave}</div>}
              {error_submit  && <div  className="error">{error_submit}</div>}
            <input placeholder="Link on project" autoComplete="off" value={link|| ''} id="link" onChange={(e) => setLink(e.target.value)} type="text"/>
            <input placeholder="Project name" value={name|| ''} id="name" onChange={(e) => setName(e.target.value)} type="text"/>
            <input placeholder="Description" value={description|| ''} id="description" onChange={(e) => setDescription(e.target.value)} type="text"/>
            <ul className="ul_from_form">
              {technologies_for_click.map((tech,ind) => 
                  <li key={tech}>
                  <input id={tech} type="checkbox" onClick={() => set_checked_t(ind)}  /><label htmlFor={tech} className="checkbox">{tech}</label>  
                  </li>
              )}
            
            </ul>
            <input placeholder="Date (yyyy.mm.dd)" value={date|| ''} id="date" onChange={(e) => setDate(e.target.value)}  type="text"/>
        <input placeholder="Epic lvl 1 - 9 if lvl 8-9 don`t will shown on mobile" value={Epic_lvl|| ''} id="lvl" onChange={(e) => setEpic_lvl(e.target.value)} type="number"/>
        <button>Submit</button>
        <button onClick={() => setModalVisible(0)}>Back</button>
        </form>
}


{modalVisible === 2 && 
<form onSubmit={chahge_pass}  autoComplete="new-password">
  <div className="form_logo">Change password</div>
    {loadingPass && <div className="error">Loading...</div>}
        {errorPass && <div  className="error">{errorPass}</div>}
      <input autoComplete="new-password" placeholder="New password" value={new_pass} id="new_pass" onChange={(e) => setNew_pass(e.target.value)} type="password"/>
      <input autoComplete="new-password"   placeholder="Submit new password" value={c_new_pass} id="c_new_pass" onChange={(e) => setC_new_pass(e.target.value)} type="password"/>
    <button>Submit</button>
  <button onClick={() => setModalVisible(0)}>Back</button>
</form>
}


{modalVisible === 3 && 
  <form onSubmit={submitHandler}  autoComplete="new-password">
  <div className="form_logo">Edit progect</div>
  {loadingSave && <div className="error">Loading...</div>}
        {errorSave && <div  className="error">{errorSave}</div>}
        {error_submit  && <div  className="error">{error_submit}</div>}
      <input placeholder="Link on project" autoComplete="off" value={link|| ''} id="link" onChange={(e) => setLink(e.target.value)} type="text"/>
      <input placeholder="Project name" value={name|| ''} id="name" onChange={(e) => setName(e.target.value)} type="text"/>
      <input placeholder="Description" value={description|| ''} id="description" onChange={(e) => setDescription(e.target.value)} type="text"/>
      <ul className="ul_from_form">
        {technologies_for_click.map((tech,ind) => 
            <li key={tech}>
            <input id={tech} type="checkbox" onClick={() => set_checked_t(ind) } defaultChecked={c_technologies[ind]}/><label htmlFor={tech} className="checkbox">{tech}</label>  
            </li>
        )}
      
      </ul>
      <input placeholder="Date (yyyy.mm.dd)" value={date|| ''} id="date" onChange={(e) => setDate(e.target.value)}  type="text"/>
  <input placeholder="Epic lvl 1 - 9 if lvl 8-9 don`t will shown on mobile" value={parseInt(Epic_lvl)|| ''} id="lvl" onChange={(e) => setEpic_lvl(e.target.value)} type="number"/>
  <button>Submit</button>
  <button onClick={() => setModalVisible(0)}>Back</button>
  </form>

}
        {
          (loading_p )? <div className="error">Loading...</div> :
          error_p? <div className="error">{error_p}</div>:
        <div className="admin_tabel">
            <div className="admin_description">
                <div className="admin_description-exact">
                <div>id</div>
                <div>link</div>
                <div onClick={() => handle_set_sort(2)} className={sort_byy === 2 ? "active_sorting" : ""}>name<i className="fa fa-sort-amount-desc" aria-hidden="true"></i></div>
                <div>description</div>
                <div >technologies</div>
                <div onClick={() => handle_set_sort(3)} className={sort_byy === 3 ? "active_sorting" : ""}>date<i className="fa fa-sort-amount-desc" aria-hidden="true"></i></div>
                <div onClick={() => handle_set_sort(1)} className={sort_byy === 1 ? "active_sorting" : ""}> epic lvl<i className="fa fa-sort-amount-desc" aria-hidden="true"></i></div>

                <div>action</div>
                </div>
                <input type="text"  placeholder="Name of the app " value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            </div>
            <div className="admin_panel">
              {projects_for_sorting.map(project => 
                <div className="panel_row" key={project._id}>
                    <div className="word_in_table">{project._id}</div>
                    <div className="word_in_table">{project.link}</div>
                    <div className="word_in_table">{project.name}</div>
                    <div className="word_in_table">{project.description}</div>
                    <div className="word_in_table">{project.technologies.map(t => t).join(", ")}</div>
                    <div className="word_in_table">{project.date}</div>
                    <div className="word_in_table">{project.Epic_lvl}</div>
                    <div className="btn_action">
                        <div className="btns_from_action">
                        <button onClick={() => deleteHandler(project)}>Delete</button>
                        <button onClick={() => editModal(project)}>Edit</button>
                        </div>
                    </div>
                    </div>
                )}
            </div>
          </div>
}
    </section>

  )
  }


function HomeScreen(props) {
  const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i"); 

  const handleClick = () => {
    let pageHeight = window.innerHeight;
    window.scrollBy(0, pageHeight);
  }
  const projectList = useSelector(state => state.projectList);
  const  {projects, loading, error} = projectList;
  var sorted_projects = projects;
  if (sorted_projects)
  sorted_projects.sort(function(a, b){
    if(a.Epic_lvl < b.Epic_lvl) { return -1; }
    if(a.Epic_lvl > b.Epic_lvl) { return 1; }
    return 0;
  })
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(listProjects())
  return () => {
    //
  }
}, [ dispatch])
  return (
    <div>
    <section  className="main_section">
    <aside>
        <ul>
            <li>
              <Link to="/logining"><i className="fa fa-user"></i></Link>
            </li>
            <li>
                <a href="https://github.com/MykytaBAshenko"><i className="fa fa-github"></i></a>
            </li>
            <li>
                <a href="https://t.me/Nikita_bbbbb"><i className="fa fa-telegram"></i></a>
            </li>
            <li>
                <a href="https://www.instagram.com/m_bashenko/"><i className="fa fa-instagram"></i></a>
            </li>
            <li>
                <a href="mailto:nikita.bashenko2001@gmail.com"><i className="fa fa-envelope"></i></a>
            </li>
            <li>
                <a href="https://www.youtube.com/channel/UCpO8IWGlnggZ5WoP6Rbn1bQ"><i className="fa fa-youtube-play"></i></a>
            </li>
            
        </ul>
    </aside>
    <div id="main_block" className="main_block">
        <div>
        <div>Hi, I`m Mykyta Bashenko, I`m kind of a programer</div>
        <div>I'm 19 years old, and I live in Kiev</div>
        <div>Technologies that I own: Git, UNIX, C, JS, HTML, CSS, SCSS, React, Redux, Node, MongoDB, SQL, PHP, Express, Figma, Photoshop</div>
        <div>I have a telecommunication and radio junior engineering degree from <a target="blank" href="https://en.wikipedia.org/wiki/National_Aviation_University">NAU</a></div>
        <div>I studied programming on the Internet and in a clone of <a target="blank" href="https://uk.wikipedia.org/wiki/UNIT_Factory">school 42</a></div>
        <div>Link on my CV <a target="blank" href="https://docs.google.com/document/d/1oZx_AhYsWK70bbsW1PzQe4Afc0JNablBch-aknAeA2s/edit?usp=sharing">Mykyta Bashenko</a>
        </div>
    </div>
  <div id="arrow" className={`without_underline link_on_proj`}  onClick={handleClick}><i className="fa fa-arrow-down" aria-hidden="true"></i></div>
        
    </div>

</section>
    {
    (loading )? <div className="error">Loading...</div> :
    error? <div className="error">{error}</div>:
    <section id="proj" className="projects_section">
      
    <div className="logo_proj">My projects</div>
    <ul className="projects">
    {sorted_projects.map(project => 
      (((!devices.test(navigator.userAgent)) || project.Epic_lvl < 7)  &&
        <li className="project" key={project._id}>
            <a href={project.link} target="blank" >
                <div className="project_title">{project.name}</div>
                <div className="project_description">{project.description}</div>
                <ul className="project_technologies">{project.technologies.map((t, index)=>
                  <li key={index+project._id}>{t}</li>
                  
                )} </ul>
                <div className="project_date">{project.date}</div>
            </a>
        </li>) ||
        null
      
    )
  } 
        
    </ul>
 </section>

}</div>
  )
}




function LoginScreen(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = '/admin';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo, props.history]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(login, password));

  }
  return <section className="form_entry">
    <form onSubmit={submitHandler} autoComplete="off">
        
    <div>Login to admin panel</div>
    
    <input defaultValue="" style={{background: "transparent"}} placeholder="login" onChange={(e) => setLogin(e.target.value)} type="text"/>
    <input defaultValue="" autoComplete="new-password" placeholder="password" onChange={(e) => setPassword(e.target.value)} type="password"/>
    <button>Login</button>
    <Link to="/"><i className="fa fa-arrow-left" aria-hidden="true"></i>Back to portfolio</Link>
    
    {loading && <div className="error">Loading...</div>}
    {error && <div className="error">{error}</div>}
    </form>
    </section>
  
}



function App(props)  {
  const path = "/";
  
  useEffect(() => {
    if (props.history.location.pathname !== "/admin" && props.history.location.pathname !== "/logining" && props.history.location.pathname !== "/") {
      props.history.push(path);
    }
    return () => {
      //
    };
  }, [ props]);
  return (
    <div className="App">
      
      <canvas  id="c" width="2560" height="1440"></canvas>
      <Route path="/" exact={true} component={HomeScreen} />
      <Route path="/logining" component={LoginScreen} />
      <Route path="/admin" component={AdminScreen} />
      <Route path='/404' component={HomeScreen} />
    </div>
  )
}

export default App;
