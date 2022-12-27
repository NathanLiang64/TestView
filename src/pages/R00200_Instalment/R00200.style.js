import styled from 'styled-components';
import Layout from 'components/Layout';

/** background: ${({ theme }) => theme.colors.background.lighterBlue}; */
const InstalmentWrapper = styled(Layout)`
  background: ${({ theme }) => theme.colors.background.white};
  padding: 16;

  .InstalmentWrapper {
    .InstalmentWrapperText {
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.text.lightGray};
    }
  }

  .closeIconButton {
    position: absolute;
    top: 0.8rem;
    right: 0.8rem;
  }

  .MuiFormGroup-root {
    label {
      margin: 0;

      .left-section {
        flex: 1;

        .name {
          font-size: 1.8rem;
        }
        .date {
          font-size: 1.4rem;
          color: ${({ theme }) => theme.colors.text.light};
        }
      }
    }
  }

  .InformationTape {
    &.checkedtape {
      border: ${({ theme }) => `1px solid ${theme.colors.primary.dark}`};
    }
    border: 1px solid transparent;
    .checkbox {
      pointer-events: none;
      .Icon {
        width: auto;
        height: auto;
        color: ${({ theme }) => theme.colors.text.dark};
      }
  
      &.Mui-checked {
        .Icon {
          color: ${({ theme }) => theme.colors.primary.dark};
        }
      }
    }
  }

  .messageBox {
    margin: 2rem;
    p {
      font-size: 1.6rem;
      text-align: center;
    }
  }

  .messageBox2 {
    background: ${({ theme }) => theme.colors.background.lighterBlue};
    border-radius: 0.8rem;
    padding: 2rem;
    margin: 1rem;

    p {
      width: 100%;
      text-align: center;
    }
    .titleText {
      color: ${({ theme }) => theme.colors.primary.light};
      text-align: center;
      font-size: 3.6rem;
    }
  }
`;

export default InstalmentWrapper;
