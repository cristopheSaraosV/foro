import { Component, signal } from '@angular/core';
import { PostComponent, PostContent } from '../../components/post/post.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-posts',
  imports: [PostComponent, MatDividerModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {

  postsContent = signal<PostContent[]>([
    {
      titulo: 'Signal y su funcionamiento',
      subtitulo: '¿Cómo usar un Signal?',
      fecha: '2 days ago',
      haveCode: true,
      codigo: `const count = signal(0); 
      effect(() => console.log(count()));`,
      textoHtml: `En Angular, un <strong>Signal</strong> es una nueva forma reactiva de manejar estado local. 
      Se define usando <code>signal(initialValue)</code> y retorna una función que actúa como getter/setter. 
      Cuando lees el signal como <code>count()</code>, obtienes su valor actual; 
      y cuando haces <code>count.set(nuevoValor)</code>, actualizas su valor y notificas automáticamente 
      a cualquier consumidor que lo esté observando. <br><br>
      Para reaccionar a los cambios, se usa <code>effect(() => ...)</code>, el cual se ejecuta inmediatamente 
      y luego nuevamente cada vez que alguno de los signals que lee cambian. 
      Esta combinación reemplaza el uso de Observables y ChangeDetection en muchos casos, 
      mejorando rendimiento, control y claridad en componentes standalone.`,
    },
    {
      titulo: 'Editar un producto de una lista usando linkedSignal',
      subtitulo: 'Cómo seleccionar un producto y actualizar la lista reactivamente',
      fecha: 'Hoy',
      haveCode: true,
      codigo: `import { signal, linkedSignal, computed } from '@angular/core';

interface Producto {
  id: number;
  nombre: string;
}

// Lista reactiva de productos
const productos = signal<Producto[]>([
  { id: 1, nombre: 'Laptop' },
  { id: 2, nombre: 'Mouse' },
  { id: 3, nombre: 'Teclado' }
]);

// Índice seleccionado
const indiceSeleccionado = signal(0);

// Producto seleccionado reactivo y editable
const productoSeleccionado = linkedSignal(
  computed(() => ({
    index: indiceSeleccionado(),
    lista: productos()
  })),
  ({ index, lista }) => lista[index],
  (nuevoProducto, { index, lista }) => {
    const nuevaLista = [...lista];
    nuevaLista[index] = nuevoProducto;
    productos.set(nuevaLista);
  }
);

// Leer el producto actual
console.log(productoSeleccionado()); // { id: 1, nombre: 'Laptop' }

// Editar el nombre del producto
productoSeleccionado.set({ id: 1, nombre: 'Laptop Gamer' });

console.log(productos());
// [
//   { id: 1, nombre: 'Laptop Gamer' },
//   { id: 2, nombre: 'Mouse' },
//   { id: 3, nombre: 'Teclado' }
// ]`,
      textoHtml: `Este ejemplo muestra cómo usar <code>linkedSignal</code> para trabajar con una lista de productos 
  donde puedes <strong>seleccionar uno</strong> y <strong>editarlo directamente</strong> sin perder reactividad ni sincronización.<br><br>

  Se parte con un <code>signal</code> que contiene una lista de productos. Luego se define un 
  <code>linkedSignal</code> llamado <code>productoSeleccionado</code> que obtiene el producto actual 
  en base al índice seleccionado (también un signal).<br><br>

  Este <code>linkedSignal</code> permite tanto <strong>leer el producto actual</strong> como 
  <strong>escribir directamente</strong> para actualizar la lista. Cuando haces <code>productoSeleccionado.set(...)</code>, 
  internamente se genera una nueva lista y se actualiza el signal original <code>productos</code>, manteniendo inmutabilidad y reactividad.<br><br>

  Este patrón es ideal para formularios donde editas un solo elemento de una lista sin duplicar lógica, 
  manteniendo sincronía automática y eficiente entre el modelo y la vista.`
    },
    {
      titulo: 'Usar effect() correctamente en Angular',
      subtitulo: 'Evita hacer set() dentro de un efecto reactivo',
      fecha: 'Hoy',
      haveCode: true,
      codigo: `import { signal, computed, effect } from '@angular/core';

const nombre = signal('Cris');
const apellido = signal('Rojas');

// Se deriva reactivamente con computed()
const nombreCompleto = computed(() => \`\${nombre()} \${apellido()}\`);

// Se usa effect() para hacer algo con el valor
effect(() => {
  console.log('Nombre completo:', nombreCompleto());
});

// Cambiamos el nombre
nombre.set('Ale');`,
      textoHtml: `El <code>effect()</code> en Angular se utiliza para <strong>reaccionar</strong> a cambios en señales 
  y ejecutar efectos colaterales como logs, llamadas a servicios o manipulación del DOM.<br><br>

  <strong>⚠️ No debes usar <code>set()</code> dentro de un <code>effect()</code></strong> para modificar otros signals, 
  ya que esto puede causar ciclos infinitos o re-ejecuciones innecesarias.<br><br>

  Para crear un valor derivado de otros signals, utiliza <code>computed()</code>. 
  Luego puedes observar ese valor derivado con <code>effect()</code> si necesitas hacer algo cuando cambia, 
  sin modificar el estado directamente.<br><br>

  Esta separación mantiene tu lógica reactiva clara, segura y eficiente.`
    }




  ]);
}
