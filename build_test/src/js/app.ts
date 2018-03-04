// import _ from './module/select';
import { Person } from './module/Person.ts';

console.log( new Person() );

let my_name:string = 'kousher';

console.log( my_name );


if (module.hot) {
   module.hot.accept('/webpack-hot/only/', function() {
     console.log('Accepting the updated printMe module!');
     printMe();
   })
}
