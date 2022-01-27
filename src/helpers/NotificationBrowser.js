export default function notification(permission, title, message, icon) {
  if (permission) {
    Notification.requestPermission((permit) => {
      console.log(permission)
      if (permit === 'granted') {
        new Notification(title, {
          body: message,
          icon,
        })
      } else {
        alert("Las notificaciones estan bloqueadas")
      }
    })
  }
}