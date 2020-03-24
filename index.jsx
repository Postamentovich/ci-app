/* eslint-disable */

/** HTML */
<header class="Header">
  <h1 class="Header-Title Title">Title</h1>
  <div class="Header-Buttons">
    <button class="Button">Button 1</button>
    <button class="Button">Button 2</button>
  </div>
</header>;

/** REACT */
const Title = ({ children }) => <h1>{children}</h1>;

const Buttons = () => {
    return (
      <>
        <Button />
        <Button />
      </>
    );
  };

const cnHeader = cn('Header');

const Header = ({ title, buttons }) => {
  <>
    <Title className={cnHeader('Title')}>{title}</Title>
    <div className={cnHeader('Buttons')}>
        {buttons}
    </div>
  </>;
};

<Header title="Title" buttons={Buttons} />;