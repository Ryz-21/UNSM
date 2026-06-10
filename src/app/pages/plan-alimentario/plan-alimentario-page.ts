import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FoodItem {
  emoji: string;
  name: string;
  benefit: string;
  detail: string;
}

interface FoodCategory {
  title: string;
  icon: string;
  items: FoodItem[];
}

interface DayMeal {
  meal: string;
  dish: string;
}

interface DayPlan {
  day: string;
  meals: DayMeal[];
}

@Component({
  selector: 'app-plan-alimentario-page',
  imports: [RouterLink],
  templateUrl: './plan-alimentario-page.html',
  styleUrl: './plan-alimentario-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlanAlimentarioPage {
  protected readonly weekPlan: DayPlan[] = [
    {
      day: 'Día 1',
      meals: [
        { meal: 'Desayuno', dish: 'Avena integral con fresas y almendras' },
        { meal: 'Colación', dish: 'Manzana con cáscara + 5 nueces' },
        { meal: 'Almuerzo', dish: 'Pechuga de pollo a la plancha + brócoli al vapor + quinoa' },
        { meal: 'Colación', dish: 'Yogur natural con arándanos' },
        { meal: 'Cena', dish: 'Ensalada de espinaca, aguacate, huevo duro y limón' },
      ],
    },
    {
      day: 'Día 2',
      meals: [
        { meal: 'Desayuno', dish: 'Batido verde: espinaca + kiwi + agua de coco' },
        { meal: 'Colación', dish: 'Puñado de almendras + 1 pera' },
        { meal: 'Almuerzo', dish: 'Salmón al horno con espárragos y lentejas' },
        { meal: 'Colación', dish: 'Palitos de pepino con yogur griego' },
        { meal: 'Cena', dish: 'Tortilla de claras con pimiento y espinaca' },
      ],
    },
    {
      day: 'Días 3 – 7 (combina libremente)',
      meals: [
        { meal: 'Desayuno', dish: 'Huevos revueltos + aguacate + tortilla de maíz integral' },
        { meal: 'Colación', dish: 'Batido de proteína vegetal con fresas o arándanos' },
        { meal: 'Almuerzo', dish: 'Garbanzos guisados con verduras + quinoa o arroz integral' },
        { meal: 'Colación', dish: 'Queso fresco con tomate cherry y orégano' },
        { meal: 'Cena', dish: 'Pechuga de pavo salteada con espinaca, champiñones y ajo' },
      ],
    },
  ];

  protected readonly categories: FoodCategory[] = [
    {
      title: 'Verduras',
      icon: '🥬',
      items: [
        { emoji: '🥦', name: 'Brócoli', benefit: 'Alto en fibra y antioxidantes', detail: 'Bajo índice glucémico. Ayuda a reducir la inflamación y mejora la digestión.' },
        { emoji: '🥬', name: 'Espinaca', benefit: 'Hierro, magnesio y vitamina K', detail: 'Sin impacto en la glucosa. Ideal para ensaladas, salteados y batidos verdes.' },
        { emoji: '🥒', name: 'Pepino', benefit: 'Hidratante y bajo en calorías', detail: 'Aporta agua y electrolitos. Puede consumirse sin restricción.' },
        { emoji: '🫑', name: 'Pimiento', benefit: 'Vitamina C y antioxidantes', detail: 'Refuerza el sistema inmune. Rojo y amarillo aportan betacaroteno.' },
      ],
    },
    {
      title: 'Frutas recomendadas',
      icon: '🍎',
      items: [
        { emoji: '🍎', name: 'Manzana', benefit: 'Rica en pectina y fibra soluble', detail: 'Índice glucémico bajo. Consumir con cáscara para mayor fibra.' },
        { emoji: '🫐', name: 'Arándanos', benefit: 'Antioxidantes protectores', detail: 'Mejoran la sensibilidad a la insulina. Ricos en antocianinas.' },
        { emoji: '🍓', name: 'Fresas', benefit: 'Vitamina C, baja en azúcar', detail: 'Menos carbohidratos que otras frutas. Excelente opción para postres.' },
        { emoji: '🥝', name: 'Kiwi', benefit: 'Fibra y vitamina C', detail: 'Índice glucémico moderado. Ayuda a la digestión y al sistema inmune.' },
      ],
    },
    {
      title: 'Proteínas magras',
      icon: '🥩',
      items: [
        { emoji: '🥩', name: 'Pechuga de pollo', benefit: 'Proteína magra y versátil', detail: 'Baja en grasa. Ideal al horno, plancha o ensaladas.' },
        { emoji: '🐟', name: 'Salmón', benefit: 'Omega-3 antiinflamatorio', detail: 'Mejora la salud cardiovascular. Rico en vitamina D y selenio.' },
        { emoji: '🥚', name: 'Huevo', benefit: 'Proteína completa y saciante', detail: 'Ayuda a mantener estables los niveles de glucosa. Consumir entero.' },
        { emoji: '🥑', name: 'Aguacate', benefit: 'Grasas saludables y fibra', detail: 'Reduce picos de glucosa. Excelente fuente de potasio y folato.' },
      ],
    },
    {
      title: 'Legumbres y cereales',
      icon: '🫘',
      items: [
        { emoji: '🫘', name: 'Lentejas', benefit: 'Proteína vegetal y fibra', detail: 'Índice glucémico bajo. Combinadas con cereal forman proteína completa.' },
        { emoji: '🌾', name: 'Avena integral', benefit: 'Fibra soluble (betaglucano)', detail: 'Reduce el colesterol y estabiliza glucosa. Preferir la versión en hojuelas.' },
        { emoji: '🫘', name: 'Garbanzo', benefit: 'Proteína, fibra y minerales', detail: 'IG bajo. Ideal en ensaladas, hummus o guisos moderados.' },
        { emoji: '🌰', name: 'Quinoa', benefit: 'Proteína completa sin gluten', detail: 'Contiene los 9 aminoácidos esenciales. Rica en magnesio y hierro.' },
      ],
    },
    {
      title: 'Lácteos y frutos secos',
      icon: '🥛',
      items: [
        { emoji: '🥛', name: 'Yogur natural', benefit: 'Probióticos y calcio', detail: 'Sin azúcar añadido. Mejora la microbiota intestinal.' },
        { emoji: '🧀', name: 'Queso fresco', benefit: 'Proteína y calcio', detail: 'Bajo en grasa. Consumir con moderación por su contenido de sodio.' },
        { emoji: '🥜', name: 'Almendras', benefit: 'Magnesio y grasa saludable', detail: 'Mejoran la sensibilidad a la insulina. Un puñado al día.' },
        { emoji: '🥜', name: 'Nueces', benefit: 'Omega-3 y antioxidantes', detail: 'Reducen la inflamación. Acompañan bien ensaladas y yogur.' },
      ],
    },
  ];

  protected downloadPdf(): void {
    window.print();
  }
}
