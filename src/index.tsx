import parseDiff from 'parse-diff'
import fs from 'fs'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

const files = parseDiff(fs.readFileSync('./format.diff').toString())

const Diff = () => (
  <table>
    <tbody>
      <Header />
      {files[0].chunks[0].changes.map((change, index) => (
        <React.Fragment key={index}>
          {change.type === 'normal' ? (
            <Normal
              column1={change.ln1}
              column2={change.ln2}
              code={change.content}
            />
          ) : change.type === 'add' ? (
            <Addition column={change.ln} code={change.content} />
          ) : (
            <Deletion column={change.ln} code={change.content} />
          )}
        </React.Fragment>
      ))}
    </tbody>
  </table>
)

const Header = () => (
  <tr>
    <td className="blob-num blob-num-hunk non-expandable"></td>
    <td className="blob-num blob-num-hunk non-expandable"></td>
    <td className="blob-code blob-code-inner blob-code-hunk">
      {files[0].chunks[0].content}
    </td>
  </tr>
)

const Normal = ({ column1, column2, code }) => (
  <tr>
    <td
      className="blob-num blob-num-context js-linkable-line-number"
      data-line-number={column1}
    ></td>
    <td
      className="blob-num blob-num-context js-linkable-line-number"
      data-line-number={column2}
    ></td>
    <td className="blob-code blob-code-context js-file-line">
      <div></div>
      <span className="blob-code-inner blob-code-marker">{code}</span>
    </td>
  </tr>
)

const Addition = ({ column, code }) => (
  <tr>
    <td className="blob-num blob-num-addition empty-cell"></td>
    <td
      className="blob-num blob-num-addition js-linkable-line-number js-code-nav-line-number"
      data-line-number={column}
    ></td>
    <td className="blob-code blob-code-addition js-file-line">
      <div></div>
      <span
        className="blob-code-inner blob-code-marker js-code-nav-pass"
        data-code-marker="+"
      >
        {' '}
        {code.slice(1)}
      </span>
    </td>
  </tr>
)

const Deletion = ({ column, code }) => (
  <tr>
    <td
      className="blob-num blob-num-deletion js-linkable-line-number"
      data-line-number={column}
    ></td>
    <td className="blob-num blob-num-deletion empty-cell"></td>
    <td className="blob-code blob-code-deletion js-file-line">
      <div></div>
      <span
        className="blob-code-inner blob-code-marker js-code-nav-pass js-skip-tagsearch"
        data-code-marker="-"
      >
        {' '}
        {code.slice(1)}
      </span>
    </td>
  </tr>
)

export default ReactDOMServer.renderToStaticMarkup(<Diff />)
