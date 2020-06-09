<template>
  <div class="details-production--wrapper">
    <ul class="details-production--list" v-if="dataPresent">
      <li class="details-production--list-label"><b>Production Details</b></li>
      <li
        class="details-production--list-item"
        v-for="productionType in productionTypes"
        :key="productionType.name"
      >
        {{
          productionType.companies.length > 0
            ? `${productionType.name}: ${productionType.companies.join(', ')}`
            : null
        }}
      </li>
    </ul>
  </div>
</template>

<script>
import KitsuService from '@/services/KitsuService.js'

export default {
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      dataPresent: false,
      productionTypes: {
        studio: {
          name: 'Studios',
          companies: []
        },
        licensor: {
          name: 'Licensors',
          companies: []
        },
        producer: {
          name: 'Producers',
          companies: []
        }
      }
    }
  },
  created() {
    this.getProductionDetails()
  },
  methods: {
    getCompanyDetails(company, type) {
      KitsuService.getData(company.relationships.company.links.related)
        .then(companyResponse => {
          if (companyResponse.data.data.attributes.name) {
            this.productionTypes[type].companies.push(
              companyResponse.data.data.attributes.name
            )
          } else if (companyResponse.data.data.attributes.slug) {
            this.productionTypes[type].companies.push(
              companyResponse.data.data.attributes.slug
            )
          }
        })
        .catch(err => {
          console.log(`There was an error fetching ${type} company data: `, err)
        })
    },
    getProductionDetails() {
      KitsuService.getData(
        this.anime.relationships.productions.links.related
      ).then(response => {
        if (response.data.meta.count > 0) {
          this.dataPresent = true
          response.data.data.forEach(company => {
            if (company.attributes.role == 'studio') {
              this.getCompanyDetails(company, 'studio')
            } else if (company.attributes.role == 'licensor') {
              this.getCompanyDetails(company, 'licensor')
            } else if (company.attributes.role == 'producer') {
              this.getCompanyDetails(company, 'producer')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.details-production--list {
  list-style-type: none;
  text-align: left;
  padding: 0;

  &-label {
    color: #808080;
    margin-bottom: 5px;
  }
  &-item {
    color: #fff;
    margin-bottom: 2px;
  }
}
</style>
