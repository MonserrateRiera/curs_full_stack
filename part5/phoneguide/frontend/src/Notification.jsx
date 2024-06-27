import './Notification.css';
const Notification = ({message, clasname})=>{

    if(message === null){
        return null;
    }
    //const clasname = message.clasname;
    //console.log(clasname);
    return (
        <div className={clasname}>
            {message}
        </div>
    )
}

export default Notification;