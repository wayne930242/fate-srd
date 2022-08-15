import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '美好的泛用系統',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        命運（Fate）是美好的、可高度客製、無限風格適應性、適用於所有想好好說故事的團的遊戲系統。
      </>
    ),
  },
  {
    title: '由 Docusaurus 建立',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus 提供了優秀的文件檢視模式與排版，方便在任何界面下閱讀。
      </>
    ),
  },
  {
    title: '歡迎找我討論',
    Svg: require('@site/static/img/undraw_around_the_world.svg').default,
    description: (
      <>
        歡迎找我一起討論命運的規則，或是回報網站的錯誤與臭蟲，<a href='https://www.plurk.com/wayne930242' target='_blank'>洪偉的噗浪</a>、<a href='https://wayneh.tw/' target='_blank'>部落格</a>。
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
