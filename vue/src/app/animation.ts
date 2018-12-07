import {
  trigger, animateChild, group,
  transition, animate, style, query,state,animation
} from '@angular/animations';


// Routable animations
export const slideInAnimation =
  trigger('routeAnimation', [
    transition('* => acceuil, inscription => connexion', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ], { optional: true }),
      /*query('@openClosed', [
        animateChild()
      ]),*/
      query(':enter', [
        style({ left: '-100%'})
      ], { optional: true }),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ], { optional: true }),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ], { optional: true })
      ]),
      query(':enter', animateChild(), { optional: true }),
    ]),
    transition('acceuil => *, connexion => inscription', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ], { optional: true }),
        /*query('@openClosed', [
            animateChild()
          ]),*/
        query(':enter', [
          style({ right: '-100%'})
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ right: '100%'}))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-out', style({ right: '0%'}))
          ])
        ]),
        query(':enter', animateChild(), { optional: true }),
      ]),
  ]);
  export const slideInMenu = trigger('slideInMenu',[
    transition(':enter',[
      style({
        
      }),
    ])
  ])
  export const transAnimation = animation([
    style({
      position: '{{position}}',
      left:'{{left}}',
      top:'{{top}}',
      height: '{{ height }}',
      opacity: '{{ opacity }}',
    }),
    animate('{{ time }}')
  ]);
export const popUpAnimation = trigger('openClosed',[
    transition(':enter',[
      style({
        opacity: 0,
        height: '100px',
        position:'absolute',
        bottom: 0,
        left: '7%',
        zIndex:2000
      }),
      animate('150ms 0s easy-out',style({
        opacity:1,
        bottom: '10%',
      }))
    ]),
    transition(':leave',[
      animate('100ms 0s easy-out',style({
        opacity: 0,
        bottom: 0
      }))
    ])
])
