export const acc = (items, list) => {
  // let heightWrapper = 0;

  console.log('textWrapper', list)
  console.log('list', list)
  console.log('scrollHeight', list[0].scrollHeight)
  console.log('scrollHeight', list[1].scrollHeight)

  // list.forEach(elem => {
  //   console.log(elem);
  //   if (heightWrapper < elem.scrollHeight) {
  //     heightWrapper = elem.scrollHeight;
  //   }
  // });

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      for (let i = 0; i < items.length; i++) {
        console.log(index, item);
        if (index === i) {
          console.log(i)
          list[i].style.height = items[i].classList.contains('footer-item_active') ?
            '' : `${list[i].scrollHeight}px`;
          items[i].classList.toggle('footer-item_active');
          items[i].classList.toggle('footer__title--type_open');
          items[i].classList.toggle('footer__title--type_close');
        } else {

          items[i].classList.remove('footer__title--type_open');
          items[i].classList.remove('footer-item_active');
          list[i].style.height = 0;
          items[i].classList.add('footer__title--type_close');
        }
      }
    });
  });
};