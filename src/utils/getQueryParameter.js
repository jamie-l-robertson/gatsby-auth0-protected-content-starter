const getQueryParameter =  val => {
  var result = '';å
  var tmp = [];

  window.location.search
    .substr(1)
    .split('&')
    .forEach(item => {
      tmp = item.split('=');
      if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    })

  if (!result) return 'home';

  return result;
}

export default getQueryParameter;