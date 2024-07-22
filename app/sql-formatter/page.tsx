'use client'
import React from 'react'
import { toolCollection } from '../components/meta'
import { Card, CardBody, Select, SelectItem, Textarea } from '@nextui-org/react'
import { Title } from '../components/Tool/Title'
import { type FormatOptionsWithLanguage, format as formatSQL } from 'sql-formatter';


const dialect = [
  {
    label: "GCP BigQuery",
    value: "bigquery"
  },
  {
    label: "DB2",
    value: "db2"
  },
  {
    label: "Apache Hive",
    value: "hive"
  },
  {
    label: "MariaDB",
    value: "mariadb"
  },
  {
    label: "MySQL",
    value: "mysql"
  },
  {
    label: "Couchbase N1QL",
    value: "n1ql"
  },
  {
    label: "Oracle PL/SQL",
    value: "plsql"
  },
  {
    label: "PostgreSQL",
    value: "postgresql"
  },
  {
    label: "Amazon Redshift",
    value: "redshift"
  },
  {
    label: "Spark",
    value: "spark"
  },
  {
    label: "Standard SQL",
    value: "sql"
  },
  {
    label: "sqlite",
    value: "sqlite"
  },
  {
    label: "SQL Server Transact-SQL",
    value: "tsql"
  },
]

const keywordCase = [
  {
    label: "UPPERCASE",
    value: "upper"
  },
  {
    label: "lowercase",
    value: "lower"
  },
  {
    label: "Preserve",
    value: "preserve"
  },
]

const indent = [
  {
    label: "Standard",
    value: "standard"
  },
  {
    label: "Tabular left",
    value: "tabularLeft"
  },
  {
    label: "Tabular right",
    value: "tabularRight"
  },
]

const Page = () => {
  const toolMeta = toolCollection.formatter.findLast((t) => t.key === 'sql')
  if (toolMeta === undefined) {
    return (
      <div>
        Will support soon...
      </div>
    )
  }
  const [dialectValue, setDialectValue] = React.useState(dialect[0]!.value);
  const [keywordCaseValue, setKeywordCaseValue] = React.useState(keywordCase[0]!.value);
  const [indentValue, setIndentValue] = React.useState(indent[0]!.value);
  const [rawSql, setRawSql] = React.useState("");

  const formattedSql = () => {
    const options = {
      keywordCase: keywordCaseValue,
      useTabs: false,
      language: dialectValue,
      indentStyle: indentValue,
    }
    return formatSQL(rawSql, options as FormatOptionsWithLanguage)
  }

  return (
    <div className='sm:w-[600px] items-center justify-center'>
      <div className='flex flex-col'>
        <Title name={toolMeta.title} desc={toolMeta.desc} />
        <Card className='mt-10'>
          <CardBody className='py-4 '>
            <div className='grid grid-cols-3 gap-2 overflow-hidden'>
              <Select
                label="Dialect"
                labelPlacement='outside'
                className="w-60"
                color='default'
                variant='flat'
                selectedKeys={[dialectValue!]}
                onChange={(e) => setDialectValue(e.target.value)}
                classNames={{
                  base: "mb-2 col-span-1",
                  mainWrapper: "w-full max-w-[180px]"
                }}
              >
                {dialect.map((elem) => (
                  <SelectItem key={elem.value} value={elem.value}>
                    {elem.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Keyword Case"
                labelPlacement='outside'
                className="w-60"
                color='default'
                variant='flat'
                selectedKeys={[keywordCaseValue!]}
                onChange={(e) => setKeywordCaseValue(e.target.value)}
                classNames={{
                  base: "mb-2 col-span-1",
                  mainWrapper: "max-w-[180px]"
                }}
              >
                {keywordCase.map((elem) => (
                  <SelectItem key={elem.value} value={elem.value}>
                    {elem.label}
                  </SelectItem>
                ))}
              </Select>
              <div>
                <Select
                  label="Indent"
                  labelPlacement='outside'
                  className="w-60"
                  color='default'
                  variant='flat'
                  selectedKeys={[indentValue!]}
                  onChange={(e) => setIndentValue(e.target.value)}
                  classNames={{
                    base: "mb-2",
                    mainWrapper: "max-w-[180px]"
                  }}
                >
                  {indent.map((elem) => (
                    <SelectItem key={elem.value} value={elem.value}>
                      {elem.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

            </div>

            <Textarea
              classNames={{
                label: "text-black my-2",
                inputWrapper: "font-normal",
                input: 'resize-y min-h-[180px] focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              size='md'
              variant='faded'
              label="Raw SQL"
              placeholder='Enter raw sql to be formatted'
              labelPlacement='outside'
              value={rawSql}
              onValueChange={setRawSql}
            />
            <Textarea
              readOnly
              classNames={{
                label: "mt-4 mb-2",
                inputWrapper: "h-full ",
                input: 'resize-y min-h-[180px]  focus:outline-none border-transparent focus:border-transparent focus:ring-0'
              }}
              label="Formatted SQL"
              labelPlacement='outside'
              size='md'
              variant='faded'
              value={formattedSql()}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Page